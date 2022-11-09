# DeepTyper

## Creating output directories for logs

    cd data
    for i in $(ls original); do \
        mkdir -p notes/DeepTyper/$i; \
    done

## Type inference

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --directory . \
            --dataset $i \
            --engine DeepTyper \
            --infer > notes/DeepTyper/$i/infer.out; \
    done

### Summary of results

```
Dataset: top1k-typed-nodeps
Number of successes: 257
Number of fails: 30
Time for type inference: 2:48:00
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 257
Number of fails: 30
Time for type inference: 2:52:06
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 69
Number of fails: 16
Time for type inference: 0:47:08
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 69
Number of fails: 16
Time for type inference: 0:47:17
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 96
Number of fails: 6
Time for type inference: 0:16:15
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 96
Number of fails: 6
Time for type inference: 0:16:10
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 39
Number of fails: 1
Time for type inference: 0:32:18
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 39
Number of fails: 1
Time for type inference: 0:32:06
```

## Type weaving

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --workers 22 \
            --directory . \
            --dataset $i \
            --engine DeepTyper \
            --weave baseline > notes/DeepTyper/$i/weave.out; \
    done

### Summary of results

```
Dataset: top1k-typed-nodeps
Number of successes: 257
Number of fails: 0
Time for type weaving: 0:00:47
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 257
Number of fails: 0
Time for type weaving: 0:00:47
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 69
Number of fails: 0
Time for type weaving: 0:00:44
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 69
Number of fails: 0
Time for type weaving: 0:00:44
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 95
Number of fails: 1
Time for type weaving: 0:00:09
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 95
Number of fails: 1
Time for type weaving: 0:00:09
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 39
Number of fails: 0
Time for type weaving: 0:00:15
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 39
Number of fails: 0
Time for type weaving: 0:00:14
```

## Type checking

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --workers 22 \
            --directory . \
            --dataset $i \
            --engine DeepTyper \
            --typecheck baseline > notes/DeepTyper/$i/typecheck.out; \
    done

### Summary of results

```
Dataset: top1k-typed-nodeps
Number of successes: 65
Number of fails: 192
Time for type checking: 0:02:21
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 52
Number of fails: 205
Time for type checking: 0:02:21
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 8
Number of fails: 61
Time for type checking: 0:00:42
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 5
Number of fails: 64
Time for type checking: 0:00:41
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 33
Number of fails: 62
Time for type checking: 0:00:54
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 29
Number of fails: 66
Time for type checking: 0:00:54
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 11
Number of fails: 28
Time for type checking: 0:00:22
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 5
Number of fails: 34
Time for type checking: 0:00:22
```
