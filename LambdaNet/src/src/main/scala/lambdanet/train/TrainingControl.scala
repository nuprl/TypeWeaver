package lambdanet.train

import ammonite.ops._

/** Use text files to control the training loop (stop, restore, etc) */
private case class TrainingControl(resultsDir: Path) {
  val stopFile: Path = resultsDir / "control" / "stop.txt"
  val restoreFile: Path = resultsDir / "control" / "restore.txt"

  def shouldStop(consumeFile: Boolean): Boolean = {
    val stop = exists(stopFile)
    if (consumeFile && stop) {
      rm(stopFile)
    }
    stop
  }

  /** If [[restoreFile]] exists, read the path from the file.
    * @param consumeFile if set to true, delete [[restoreFile]] after reading. */
  def restoreFromFile(consumeFile: Boolean): Option[Path] = {
    val restore = exists(restoreFile)
    if (restore) {
      val content = read(restoreFile).trim
      val p = try Path(content)
      catch {
        case _: IllegalArgumentException => restoreFile / up / RelPath(content)
      }
      if (consumeFile) {
        rm(restoreFile)
      }
      Some(p)
    } else None
  }
}
