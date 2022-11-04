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
Number of successes: 256
Number of fails: 31
Time for type inference: 2:50:57
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 256
Number of fails: 31
Time for type inference: 2:52:15
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 69
Number of fails: 16
Time for type inference: 0:48:00
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 69
Number of fails: 16
Time for type inference: 0:48:21
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 96
Number of fails: 6
Time for type inference: 0:16:52
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 96
Number of fails: 6
Time for type inference: 0:16:25
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 39
Number of fails: 1
Time for type inference: 0:32:08
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 39
Number of fails: 1
Time for type inference: 0:32:01
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
Number of successes: 256
Number of fails: 0
Time for type weaving: 0:00:47
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 256
Number of fails: 0
Time for type weaving: 0:00:46
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 69
Number of fails: 0
Time for type weaving: 0:00:47
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 69
Number of fails: 0
Time for type weaving: 0:00:46
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 95
Number of fails: 1
Time for type weaving: 0:00:11
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 95
Number of fails: 1
Time for type weaving: 0:00:11
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 39
Number of fails: 0
Time for type weaving: 0:00:14
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
Number of successes: 44
Number of fails: 212
Time for type checking: 0:02:18
```

```
Dataset: top1k-typed-nodeps-es6
Number of successes: 34
Number of fails: 222
Time for type checking: 0:02:18
```

```
Dataset: top1k-typed-with-typed-deps
Number of successes: 5
Number of fails: 64
Time for type checking: 0:00:40
```

```
Dataset: top1k-typed-with-typed-deps-es6
Number of successes: 2
Number of fails: 67
Time for type checking: 0:00:41
```

```
Dataset: top1k-untyped-nodeps
Number of successes: 23
Number of fails: 72
Time for type checking: 0:00:53
```

```
Dataset: top1k-untyped-nodeps-es6
Number of successes: 16
Number of fails: 79
Time for type checking: 0:00:53
```

```
Dataset: top1k-untyped-with-typed-deps
Number of successes: 10
Number of fails: 29
Time for type checking: 0:00:22
```

```
Dataset: top1k-untyped-with-typed-deps-es6
Number of successes: 4
Number of fails: 35
Time for type checking: 0:00:22
```
