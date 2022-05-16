#!/bin/env bash

if [[ $# -ne 1 ]]; then
    echo "Need to provide directory of repos to type check!"
    exit 1
fi

DIR=$1
INPUTFILE="notes/$DIR/type-inf-outputs.txt"
INPUTLINES=$(cat $INPUTFILE)
COUNT=$(wc -l < $INPUTFILE)
I=1

for FILE in $INPUTLINES; do
    echo -n "Type checking $FILE... ($I/$COUNT)"
    let I=$I+1

    tsc --noEmit $DIR/$FILE >> notes/$DIR/type-check-errs.txt

    if [[ $? -eq 0 ]]; then
        echo -e " \e[1;32m[PASS]\e[0m"
        echo $FILE >> notes/$DIR/type-check-pass.txt
    else
        echo -e " \e[1;31m[FAIL]\e[0m"
        echo $FILE >> notes/$DIR/type-check-fail.txt
    fi
done
