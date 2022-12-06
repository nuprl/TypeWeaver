FROM openjdk:11

# set up dependencies
RUN apt-get update -yq && apt-get install -yq \
    build-essential \
    openjdk-11-jre-headless \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /code

# set up nodejs and node modules
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
 && apt-get install -yq nodejs \
 && npm install -g \
    typescript@"^3.4.1" \
 && npm install \
    fs@latest \
    source-map-support@"^0.5.11" \
    yargs@"^13.2.2" \
    @types/node@"^11.10.5" \
    @types/source-map-support@"^0.5.0" \
    @types/yargs@"^12.0.10"

# set up scala and sbt
RUN curl -sLO "https://downloads.lightbend.com/scala/2.12.10/scala-2.12.10.deb" \
 && dpkg -i scala-2.12.10.deb \
 && rm -rf scala-2.12.10.deb \
 && curl -sLO "https://github.com/sbt/sbt/releases/download/v1.3.13/sbt-1.3.13.tgz" \
 && mkdir -p /opt \
 && tar xzf sbt-1.3.13.tgz -C /opt
ENV PATH="${PATH}:/opt/sbt/bin"
