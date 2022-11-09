# LambdaNet

## Creating output directories for logs

    cd data
    for i in $(ls original); do \
        mkdir -p notes/LambdaNet/$i; \
    done

## Type inference

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --directory . \
            --dataset $i \
            --engine LambdaNet \
            --infer > notes/LambdaNet/$i/infer.out; \
    done

### Summary of results

```
Dataset: top1k-typed-nodeps
Number of successes: 249
Number of fails: 38
Time for type inference: 0:58:39
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 248
Number of fails: 39
Time for type inference: 0:56:09
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 70
Number of fails: 15
Time for type inference: 0:13:41
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 70
Number of fails: 15
Time for type inference: 0:13:46
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 87
Number of fails: 15
Time for type inference: 0:15:26
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 87
Number of fails: 15
Time for type inference: 0:15:21
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 34
Number of fails: 6
Time for type inference: 0:06:56
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 35
Number of fails: 5
Time for type inference: 0:06:56
```

## Type weaving

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --workers 22 \
            --directory . \
            --dataset $i \
            --engine LambdaNet \
            --weave baseline > notes/LambdaNet/$i/weave.out; \
    done

### Summary of results

```
Dataset: top1k-typed-nodeps
Number of successes: 249
Number of fails: 0
Time for type weaving: 0:09:06
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 248
Number of fails: 0
Time for type weaving: 0:09:10
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 70
Number of fails: 0
Time for type weaving: 0:01:03
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 70
Number of fails: 0
Time for type weaving: 0:01:05
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 87
Number of fails: 0
Time for type weaving: 0:01:58
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 87
Number of fails: 0
Time for type weaving: 0:02:02
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 34
Number of fails: 0
Time for type weaving: 0:02:51
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 35
Number of fails: 0
Time for type weaving: 0:02:52
```

## Type checking

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --workers 22 \
            --directory . \
            --dataset $i \
            --engine LambdaNet \
            --typecheck baseline > notes/LambdaNet/$i/typecheck.out; \
    done

### Summary of results

```
Dataset: top1k-typed-nodeps
Number of successes: 16
Number of fails: 233
Time for type checking: 0:02:20
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 16
Number of fails: 232
Time for type checking: 0:02:19
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 1
Number of fails: 69
Time for type checking: 0:00:42
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 0
Number of fails: 70
Time for type checking: 0:00:43
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 2
Number of fails: 85
Time for type checking: 0:00:50
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 2
Number of fails: 85
Time for type checking: 0:00:49
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 1
Number of fails: 33
Time for type checking: 0:00:20
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 2
Number of fails: 33
Time for type checking: 0:00:21
```
