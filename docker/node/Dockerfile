FROM node:14

ENV APP_ROOT /var/app/
WORKDIR $APP_ROOT

RUN apt-get update && apt-get install -y wget gnupg apt-transport-https

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package.json yarn.lock $APP_ROOT
RUN yarn install

COPY ./prisma $APP_ROOT
RUN yarn schema:generate

COPY . $APP_ROOT/

CMD [ "yarn", "server:up" ]