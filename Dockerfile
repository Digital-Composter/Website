FROM node:18-alpine
WORKDIR /opt/app
COPY . .

RUN npm install

EXPOSE 8080
CMD [ "npm", "build"]
