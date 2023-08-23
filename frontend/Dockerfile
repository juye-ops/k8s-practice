FROM node:18

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /root

COPY . .

RUN npm install

CMD ["npm", "start"]