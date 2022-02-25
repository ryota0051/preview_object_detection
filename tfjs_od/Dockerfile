FROM node:17.5-slim

ARG WORKDIR

ENV HOME=/${WORKDIR}

WORKDIR ${HOME}

COPY --chown=node:node package*.json ./

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY --chown=node:node . .
