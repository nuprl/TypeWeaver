FROM node:18.12.1

# set up dependencies
RUN apt-get update -yq && apt-get install -yq \
        build-essential \
 && rm -rf /var/lib/apt/lists/*

ENV PATH="${PATH}:/code/node_modules/.bin"

# copy package.json and install node modules
WORKDIR /code
COPY src/*.json .
RUN npm install

# compile typescript
COPY src .
RUN tsc

ENTRYPOINT ["node", "index.js"]
