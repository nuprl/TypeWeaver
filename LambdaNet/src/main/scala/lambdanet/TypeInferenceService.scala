package lambdanet

import ammonite.ops.Path
import ammonite.{ops => amm}
import funcdiff.ParamCollection
import funcdiff.SimpleMath.{readObjectFromFile, saveObjectToFile}
import lambdanet.PrepareRepos.ParsedRepos
import lambdanet.architecture.GATArchitecture
import lambdanet.train.{DataSet, TopNDistribution}
import lambdanet.translation.PredicateGraph

import java.io.{PrintWriter, BufferedReader, InputStreamReader, StringWriter}
import java.net.ServerSocket

import scala.collection.parallel.ForkJoinTaskSupport
import scala.concurrent.{Await,Future}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._
import scala.concurrent.forkjoin.ForkJoinPool
import scala.io.Source
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

  def startService() = {
    val modelDir = amm.pwd / "models" / "newParsing-GAT1-fc2-newSim-decay-6"
    val paramPath = modelDir / "params.serialized"
    val modelCachePath = modelDir / "model.serialized"
    val modelConfig = ModelConfig()

    val model =
      loadModel(paramPath, modelCachePath, modelConfig, numOfThreads = 8)

    model.PredictionService(numOfThreads = 8, predictTopK = 5)
  }

  def repl(): Unit = {
    val service = startService()
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

  def server(port: Int): Unit = {
    try {
      println(s"Waiting for connection on port: $port")
      val serverSocket = new ServerSocket(port)
      val clientSocket = serverSocket.accept()
      new PrintWriter(clientSocket.getOutputStream, true) {
        println(s"Connection opened, close by sending ':q'.")
        val service = startService()
        println("Service ready.")
        Source.fromInputStream(clientSocket.getInputStream).getLines
          .takeWhile(!_.toLowerCase.startsWith(":q"))
          .foreach { line =>
            Console.println(s"Handling: $line")
            try {
              val sourcePath = Path(line, amm.pwd)
              val results = Await.result(Future {
                  service.predictOnProject(sourcePath, warnOnErrors = false)
                }, 2.minutes)
              PredictionResults(sourcePath, results).prettyPrint()
              println("0")
            } catch {
              case e: Throwable =>
                val filePath = Path(line, amm.pwd) / amm.RelPath("output.err")
                val sw = new StringWriter
                e.printStackTrace(new PrintWriter(sw))
                amm.write.over(filePath, sw.toString)
                println("1")
            }
          }
        Console.println(s"Gracefully closing connection")
        clientSocket.close()
      }
    } catch {
      case e: Throwable =>
        println(s"Got exception: ${e.getMessage}")
        e.printStackTrace(System.out)
    }
  }

  def main(args: Array[String]): Unit = {
    args.length match {
      case 1 =>
        val port = args(0).toInt
        server(port)
      case _ => repl()
    }
  }
}
