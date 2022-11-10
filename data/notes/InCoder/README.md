# InCoder

## Creating output directories for logs

    cd data
    for i in $(ls original); do \
        mkdir -p notes/InCoder/$i; \
    done

## Type inference

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --directory . \
            --dataset $i \
            --engine InCoder \
            --infer > notes/InCoder/$i/infer.out; \
    done

### Summary of results

```
Dataset: top1k-typed-nodeps
Number of successes: 278
Number of fails: 9
Time for type inference: 0:32:08
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 278
Number of fails: 9
Time for type inference: 0:34:18
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 77
Number of fails: 8
Time for type inference: 0:11:31
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 77
Number of fails: 8
Time for type inference: 0:12:06
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 100
Number of fails: 2
Time for type inference: 0:04:15
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 100
Number of fails: 2
Time for type inference: 0:06:00
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 39
Number of fails: 1
Time for type inference: 0:03:30
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 39
Number of fails: 1
Time for type inference: 0:03:16
```

## Type checking

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --workers 22 \
            --directory . \
            --dataset $i \
            --engine InCoder \
            --typecheck baseline > notes/InCoder/$i/typecheck.out; \
    done

### Summary of results

```
Dataset: top1k-typed-nodeps
Number of successes: 57
Number of fails: 221
Time for type checking: 0:02:48
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 53
Number of fails: 225
Time for type checking: 0:02:51
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 10
Number of fails: 67
Time for type checking: 0:00:48
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 9
Number of fails: 68
Time for type checking: 0:00:47
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 30
Number of fails: 70
Time for type checking: 0:01:01
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 29
Number of fails: 71
Time for type checking: 0:01:02
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 10
Number of fails: 29
Time for type checking: 0:00:25
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 3
Number of fails: 36
Time for type checking: 0:00:24
```
