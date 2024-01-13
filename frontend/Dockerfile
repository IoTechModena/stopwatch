FROM node AS builder
WORKDIR /App

COPY package.json .
RUN npm install
COPY . ./
RUN npm run build
