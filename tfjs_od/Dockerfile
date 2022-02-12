FROM node:17.5-slim

ARG WORKDIR

ENV HOME=/${WORKDIR}

WORKDIR ${HOME}

COPY ["package.json", "package-lock.json", "/app/"]

RUN npm install

COPY . .
