# Modified README

## Instructions

1. Install dependencies (see below).
2. `cd scripts/ts && npm i && node_modules/.bin/tsc`
    - This installs the NPM dependencies and compiles the TypeScript files.
3. Optional: run `sbt "runMain lambdanet.JavaAPI"`
    - sbt needs to fetch and build itself for the first time, and the LambdaNet Scala files need to be compiled.
      This will happen automatically, but the first execution will be very slow.
4. Run `sbt "runMain lambdanet.TypeInferenceService"`

This will load the model (which takes about 40 seconds) and then prompt for a directory to a project.
LambdaNet will read all the .ts files from that directory and perform type inference (which takes about 2 seconds with a GPU).
The output is preceded by `[info]`, but should be easily parsed:

    ({start_line},{start_col})-({end_line},{end_col}): [1]({percent1}) {type1}

There are 5 predictions in total, separated by commas. For multiple files, LambdaNet will print a header, e.g. `=== File: file.ts ===`.

LambdaNet is aware of which identifiers are declarations, and does not produce predictions for variable uses.

"Batch mode" and the Docker file do not seem useful for running with our own dataset.

## Dependencies

I use [asdf](https://github.com/asdf-vm/asdf) and [direnv](https://github.com/asdf-community/asdf-direnv) to manage language versions and environment variables.

* NodeJS 16.15.0, installed with the [asdf plugin](https://github.com/asdf-vm/asdf-nodejs)
* Java 11 (openjdk-11.0.2), installed with the [asdf plugin](https://github.com/halcyon/asdf-java)
* Scala 2.12.10, installed with the [asdf plugin](https://github.com/asdf-community/asdf-scala)
* sbt 1.3.13, installed with the [asdf plugin](https://github.com/bram2000/asdf-sbt)

# Original README

<img src="images/Header.png" width="800" alt="LambdaNet Header"/>

This is the source code repo for the ICLR paper [*LambdaNet: Probabilistic Type Inference using Graph Neural Networks*](https://openreview.net/forum?id=Hkx6hANtwH). For an overview of how LambdaNet works, see [our video from ICLR 2020](https://iclr.cc/virtual_2020/poster_Hkx6hANtwH.html).

This branch contains the code and model for reproducing the results from our ICLR paper. To use the latest released features, switch to the master branch.

## Instructions
After cloning this repo, here are the steps to reproduce our experimental results:

 1. Install all the dependencies (Java, sbt, Typescript, etc.) See the "Using Docker" section below.
 2. To run pre-trained model
    1. download the model weights using [this link (predicts user defined type)](https://drive.google.com/file/d/1NvEVQ4-5tC3Nc-Mzpu3vYeyEcaM_zEgV/view?usp=sharing) or [this link (only library types)](TODO), unzip the file, and put the `models` file under the project root. 
    2. To run the model in interative mode, which outputs `(source code position, predicted type)` pairs for the specified files:
        1. Under project root, run `sbt "runMain lambdanet.TypeInferenceService"`.
        2. After it finishes loading the model into memory, simply enter the directory path containing Typescript files.
        3. Note that currently, LambdaNet only works with Typescript files, so if you want to run it on Javascript files, you will need to change the file extensions to `.ts`.
    3. Alternatively, to run the model in batched mode, which outputs human-readable HTML files and accuracy statistics:
        1. download the [parsedRepos file](https://drive.google.com/file/d/1ZhsUf9bUzT3ZJB0KzNP6w2aj3sQZwtsp/view?usp=sharing), unzip the file and put the directory under `<project root>/data`.
        2. Check the file `src/main/scala/lambdanet/RunTrainedModel.scala` and change the parameters under the todo comments depending on which model you want to run and where your test TypeScript files are located.
        3. Under project root, use `sbt runTrained` to run the model.
 3. To train LambdaNet from scratch 
    1. Download the Typescript projects used in our experiments.
    2. Filter and prepare the TS projects into a serialization format.
    3. start the training.

The Typescript files used for manual comparison with JSNice are put under the directory `data/comparison/`.


### Using Docker
We also provide a Docker file to automatically download and install all the dependencies. Here are the steps to run pre-trained LambdaNet model inside a Docker Container: 

  1. First, make sure you have [installed Docker](https://www.docker.com/get-started).
  
  2. Put pre-trained model weights under `models/`.
   
  3. Under project root, run `docker build -t lambdanet:v1 .
  && docker run --name lambdanet --memory 14g -t -i lambdanet:v1 `. (Make sure the machine you are using has enough memory for the `docker run` command.)
  
  4. After the Docker container has successfully started, run `sbt runTrained`, and you should see LambdaNet outputs "libAccuracy" and "projectAccuracy" after a few minutes. LambdaNet also stores its predictions into an Html file under `<test TS project>/predictions/` (`<test TS project>` is currently default to `data/ts-algorithms`, but you can change this in `src/main/scala/lambdanet/RunTrainedModel.scala`.)
