FROM openjdk:11

# set up dependencies
RUN apt-get update -yq && apt-get install -yq \
    build-essential \
    openjdk-11-jre-headless \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /code

# set up nodejs and typescript
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
 && apt-get install -yq nodejs \
 && npm install -g \
    typescript@"^4.7.3"

# copy package.json and install node modules
WORKDIR /code/scripts/ts
COPY src/scripts/ts/package.json src/scripts/ts/package-lock.json .
RUN npm install

WORKDIR /code

# set up scala and sbt
RUN curl -sLO "https://downloads.lightbend.com/scala/2.12.10/scala-2.12.10.deb" \
 && dpkg -i scala-2.12.10.deb \
 && rm -rf scala-2.12.10.deb \
 && curl -sLO "https://github.com/sbt/sbt/releases/download/v1.3.13/sbt-1.3.13.tgz" \
 && mkdir -p /opt \
 && tar xzf sbt-1.3.13.tgz -C /opt \
 && rm -rf sbt-1.3.13.tgz
ENV PATH="${PATH}:/opt/sbt/bin"

COPY src /code

# compile typescript
RUN (cd scripts/ts && tsc)

# compile scala
RUN sbt "runMain lambdanet.JavaAPI"

ENTRYPOINT ["sbt", "runMain lambdanet.TypeInferenceService"]
