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
```

```
Dataset: top1k-typed-nodeps-es6
```

```
Dataset: top1k-typed-with-typed-deps
```

```
Dataset: top1k-typed-with-typed-deps-es6
```

```
Dataset: top1k-untyped-nodeps
```

```
Dataset: top1k-untyped-nodeps-es6
```

```
Dataset: top1k-untyped-with-typed-deps
```

```
Dataset: top1k-untyped-with-typed-deps-es6
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
```

```
Dataset: top1k-typed-nodeps-es6
```

```
Dataset: top1k-typed-with-typed-deps
```

```
Dataset: top1k-typed-with-typed-deps-es6
```

```
Dataset: top1k-untyped-nodeps
```

```
Dataset: top1k-untyped-nodeps-es6
```

```
Dataset: top1k-untyped-with-typed-deps
```

```
Dataset: top1k-untyped-with-typed-deps-es6
```
