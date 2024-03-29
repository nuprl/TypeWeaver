package lambdanet

import ammonite.ops.Path
import ammonite.{ops => amm}
import funcdiff.ParamCollection
import funcdiff.SimpleMath.{readObjectFromFile, saveObjectToFile}
import lambdanet.PrepareRepos.ParsedRepos
import lambdanet.architecture.GATArchitecture
import lambdanet.train.{DataSet, TopNDistribution}
import lambdanet.translation.PredicateGraph

import java.io.{PrintWriter, StringWriter}

import scala.collection.parallel.ForkJoinTaskSupport
import scala.concurrent.{Await,Future}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._
import scala.concurrent.forkjoin.ForkJoinPool
import scala.util.Random

object TypeInferenceService {

  case class ModelConfig(
      dimMessage: Int = 32,
      gatHeads: Int = 1,
      seed: Long = 1,
  )

  def loadModel(
      paramPath: Path,
      modelCachePath: Path,
      modelConfig: ModelConfig,
      numOfThreads: Int,
      parsedReposDir: Path = amm.pwd / 'data / "parsedRepos",
  ): Model =
    if (amm.exists(modelCachePath)) {
      announced("Load model from cache") {
        readObjectFromFile[Model](modelCachePath.toIO)
      }
    } else {
      import modelConfig._

      println(
        s"No model file found under '$modelCachePath', creating new model..."
      )

      val pc = announced("Load model weights")(
        ParamCollection.fromFile(paramPath)
      )

      val dataSet = announced("Process data set") {
        val repos = ParsedRepos.readFromDir(parsedReposDir)
        DataSet.makeDataSet(
          repos,
          Some(new ForkJoinTaskSupport(new ForkJoinPool(numOfThreads))),
          useSeqModel = false,
          toyMode = false,
          onlyPredictLibType = false
        )
      }
      val model = announced("Create model") {
        val architecture = GATArchitecture(gatHeads, dimMessage, pc)
        Model.fromData(dataSet, architecture, new Random(seed))
      }

      announced(s"Save model to '$modelCachePath'") {
        saveObjectToFile(modelCachePath.toIO)(model)
      }
      model
    }

  case class PredictionResults(
      sourcePath: Path,
      map: Map[PredicateGraph.PNode, TopNDistribution[PredicateGraph.PType]]
  ) {
    def prettyPrint(): Unit = {
      val byFile = map.keys.groupBy(_.srcSpan.get.srcFile).toSeq.sortBy(_._1)
      byFile.foreach {
        case (file, nodes) =>
          val filePath = sourcePath / amm.RelPath(file.toString.stripSuffix(file.ext) + "csv")
          amm.write.over(filePath, "")
          nodes.toSeq.sortBy(_.srcSpan.get.start).foreach { n =>
            val span = n.srcSpan.get.showShort()
            val rankedList = map(n).distr.zipWithIndex
              .map {
                case ((p, ty), i) => {
                  val acc = "%.4f".format(p)
                  s"${ty.showSimple},$acc"
                }
              }
              .mkString(",")
            amm.write.append(filePath, s"$span,$rankedList\n")
          }
          println(s"Wrote: $filePath")
      }
    }
  }

  def main(args: Array[String]): Unit = {
    val modelDir = amm.pwd / "models" / "newParsing-GAT1-fc2-newSim-decay-6"
    val paramPath = modelDir / "params.serialized"
    val modelCachePath = modelDir / "model.serialized"
    val modelConfig = ModelConfig()

    val model =
      loadModel(paramPath, modelCachePath, modelConfig, numOfThreads = 8)
    val service = model.PredictionService(numOfThreads = 8, predictTopK = 5)
    printResult("Type Inference Service successfully started.")
    printResult(s"Current working directory: ${amm.pwd}")
    while (true) {
      print("Enter project path: ")
      System.out.flush()
      val line = Option(scala.io.StdIn.readLine())
      line match {
        case Some(line) if line.strip().nonEmpty =>
          try {
            val sourcePath = Path(line, amm.pwd)
            val results = Await.result(Future {
                service.predictOnProject(sourcePath, warnOnErrors = false)
              }, 2.minutes)
            PredictionResults(sourcePath, results).prettyPrint()
            if (!args.isEmpty && args(0).equals("--writeDoneFile")) {
              val filePath = Path(line, amm.pwd) / amm.RelPath("done.ok")
              amm.write.over(filePath, "")
            }
          } catch {
            case e: Throwable =>
              val filePath = Path(line, amm.pwd) / amm.RelPath("output.err")
              val sw = new StringWriter
              e.printStackTrace(new PrintWriter(sw))
              amm.write.over(filePath, sw.toString)
              println(s"Exception, wrote: '$filePath'")
          }
        case _ => return
      }
    }
  }
}
