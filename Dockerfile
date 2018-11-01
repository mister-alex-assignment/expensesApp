FROM node:8

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install app dependencies
COPY . /usr/src/app/

EXPOSE 3000

RUN npm install

CMD [ "npm", "start" ]