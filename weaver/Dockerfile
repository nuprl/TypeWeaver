FROM node:18.12.1

# set up dependencies
RUN apt-get update -yq && apt-get install -yq \
        build-essential \
        cloc \
 && rm -rf /var/lib/apt/lists/*

ENV PATH="${PATH}:/code/node_modules/.bin"

# install modules and compile typescript
COPY src /code
WORKDIR /code
RUN npm install \
 && tsc

ENTRYPOINT ["node", "index.js"]
