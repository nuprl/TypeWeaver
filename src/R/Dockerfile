FROM rocker/tidyverse:4.2.2

RUN R -s -e \
    'install.packages(c("tidyverse", "scales", "extrafont")); \
     library(extrafont); \
     font_install("fontcm", prompt=FALSE)'

WORKDIR /code
COPY figures.R .

ENTRYPOINT ["Rscript", "figures.R"]
