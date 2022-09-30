# top1k-untyped-nodeps

This dataset contains JavaScript packages that are untyped and have no
dependencies.

`top1k-untyped-nodeps.csv` contains statistics about the number of dependencies
and lines of JavaScript code for each package.


# DeepTyper

## Type inference

Command:

    python ../tools/runner.py \
        --engine DeepTyper \
        --directory . \
        --dataset top1k-untyped-nodeps \
        --infer > notes/DeepTyper/top1k-untyped-nodeps/infer.out

Summary:

    Number of successes: 255
    Number of fails: 8
    Number of skips: 0
    Time for type inference: 0:18:14

## Type weaving

Command:

    python ../tools/runner.py \
        --engine DeepTyper \
        --workers 16 \
        --directory . \
        --dataset top1k-untyped-nodeps \
        --weave baseline > notes/DeepTyper/top1k-untyped-nodeps/weave.out

Summary:

    Number of successes: 254
    Number of fails: 1
    Number of skips: 0
    Time for type weaving: 0:00:11

## Type checking

Command:

    python ../tools/runner.py \
        --engine DeepTyper \
        --workers 16 \
        --directory . \
        --dataset top1k-untyped-nodeps \
        --typecheck baseline > notes/DeepTyper/top1k-untyped-nodeps/typecheck.out

Summary:

    Number of successes: 33
    Number of fails: 69
    Number of skips: 0
    Time for type checking: 0:00:31

Note: 102 projects were type checked; however, this includes projects that were
not fully migrated to TypeScript.

For a per-file count of type checking failures, we use `find` to count the
number of JavaScript files in the dataset, and `grep` the errors to count the
number of files with compiler errors:

    for i in `find DeepTyper/top1k-untyped-nodeps/baseline-checked -name "*.err"`; do \
        cat $i >> DeepTyper/top1k-untyped-nodeps/errors; \
    done

    find original/top1k-untyped-nodeps -name "*.js" -type f | wc -l

    grep "^[^ ]" DeepTyper/top1k-untyped-nodeps \
        | cut -d"(" -f1 | sort | uniq | wc -l

There are 263 JavaScript files in the dataset, and 139 had type checking errors.

A list of unique error numbers, sorted by descending count, can be produced by:

    grep -Po "error TS\d+:" errors \
        | sed -E 's/error (TS.+):/\1/' \
        | sort | uniq -c | sort -nr

The top errors (>= 10 occurrences) are listed below:

    256 TS2339
    201 TS2322
     90 TS2349
     74 TS2304
     46 TS2554
     46 TS2300
     39 TS2345
     30 TS2451
     28 TS2551
     16 TS2350
     14 TS2307
     13 TS1056
     11 TS2403
     11 TS2393

A list of TypeScript diagnostic messages can be found here:

    https://github.com/Microsoft/TypeScript/blob/v4.7.3/src/compiler/diagnosticMessages.json


# LambdaNet

## Type inference

Command:

    python ../tools/runner.py \
        --engine LambdaNet \
        --directory . \
        --dataset top1k-untyped-nodeps \
        --infer > notes/LambdaNet/top1k-untyped-nodeps/infer.out

Summary:

    Number of successes: 86
    Number of fails: 16
    Number of skips: 0
    Time for type inference: 0:05:00

## Type weaving

Command:

    python ../tools/runner.py \
        --engine LambdaNet \
        --workers 16 \
        --directory . \
        --dataset top1k-untyped-nodeps \
        --weave baseline > notes/LambdaNet/top1k-untyped-nodeps/weave.out

Summary:

    Number of successes: 227
    Number of fails: 0
    Number of skips: 0
    Time for type weaving: 0:01:28

## Type checking

Command:

    python ../tools/runner.py \
        --engine LambdaNet \
        --workers 16 \
        --directory . \
        --dataset top1k-untyped-nodeps \
        --typecheck baseline > notes/LambdaNet/top1k-untyped-nodeps/typecheck.out

Summary:

    Number of successes: 2
    Number of fails: 84
    Number of skips: 0
    Time for type checking: 0:00:26

For a per-file count of type checking failures, we use `find` to count the
number of JavaScript files in the dataset, and `grep` the errors to count the
number of files with compiler errors:

    for i in `find LambdaNet/top1k-untyped-nodeps/baseline-checked -name "*.err"`; do \
        cat $i >> LambdaNet/top1k-untyped-nodeps/errors; \
    done

    find original/top1k-untyped-nodeps -name "*.js" -type f | wc -l

    grep "^[^ ]" LambdaNet/top1k-untyped-nodeps \
        | cut -d"(" -f1 | sort | uniq | wc -l

There are 263 JavaScript files in the dataset, and 184 had type checking errors.

A list of unique error numbers, sorted by descending count, can be produced by:

    grep -Po "error TS\d+:" errors \
        | sed -E 's/error (TS.+):/\1/' \
        | sort | uniq -c | sort -nr

The top errors (>= 100 occurrences) are listed below:

    1802 TS2339
    1525 TS2362
     908 TS2365
     395 TS2345
     366 TS2314
     225 TS2304
     200 TS2538
     174 TS2363
     148 TS2356
     145 TS2322

A list of TypeScript diagnostic messages can be found here:

    https://github.com/Microsoft/TypeScript/blob/v4.7.3/src/compiler/diagnosticMessages.json
