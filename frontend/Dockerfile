FROM node AS builder
WORKDIR /app

COPY package.json .
RUN npm install
COPY . ./
ENTRYPOINT ["npm", "run", "build"]
