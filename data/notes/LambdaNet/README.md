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

## Type weaving

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --workers 22 \
            --directory . \
            --dataset $i \
            --engine LambdaNet \
            --weave baseline > notes/LambdaNet/$i/weave.out; \
    done

## Type checking

    for i in $(ls original); do \
        python ../tools/run_migration_pipeline/main.py \
            --workers 22 \
            --directory . \
            --dataset $i \
            --engine LambdaNet \
            --typecheck baseline > notes/LambdaNet/$i/typecheck.out; \
    done
