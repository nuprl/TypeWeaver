#!/bin/bash

# This script uses ghostscript to embed fonts into the pdf
# Verify font embedding worked with `pdffonts file.pdf`

for i in $@; do
    echo "Embedding fonts for $i..."
    temp_fig=${i/.pdf/_.pdf}
    mv $i $temp_fig
    gs -q -dSAFER -dNOPAUSE -dBATCH -dPDFSETTINGS=/prepress \
        -dCompatibilityLevel=1.5 -sDEVICE=pdfwrite \
        -sOutputFile=$i -f $temp_fig; \
    rm $temp_fig; \
done
