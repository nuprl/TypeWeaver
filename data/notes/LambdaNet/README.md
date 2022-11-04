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
Number of successes: 251
Number of fails: 36
Time for type inference: 0:51:18
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 247
Number of fails: 40
Time for type inference: 0:57:08
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 70
Number of fails: 15
Time for type inference: 0:13:56
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 70
Number of fails: 15
Time for type inference: 0:13:56
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 86
Number of fails: 16
Time for type inference: 0:15:41
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 86
Number of fails: 16
Time for type inference: 0:15:46
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 34
Number of fails: 6
Time for type inference: 0:07:05
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 35
Number of fails: 5
Time for type inference: 0:07:00
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
Number of successes: 251
Number of fails: 0
Time for type weaving: 0:09:27
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 247
Number of fails: 0
Time for type weaving: 0:08:56
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
Time for type weaving: 0:01:07
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 86
Number of fails: 0
Time for type weaving: 0:02:02
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 86
Number of fails: 0
Time for type weaving: 0:02:01
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 34
Number of fails: 0
Time for type weaving: 0:02:50
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 35
Number of fails: 0
Time for type weaving: 0:02:53
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
Number of successes: 13
Number of fails: 238
Time for type checking: 0:02:18
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 14
Number of fails: 233
Time for type checking: 0:02:16
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
Time for type checking: 0:00:42
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 0
Number of fails: 86
Time for type checking: 0:00:47
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 0
Number of fails: 86
Time for type checking: 0:00:47
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
Time for type checking: 0:00:20
```
