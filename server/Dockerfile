# Specify a base image

FROM node:alpine as builder

WORKDIR  '/appserver'

# install some depenendencies
COPY ./package.json ./ 
RUN npm install
COPY ./ ./


# Default CMD

CMD ["npm", "start"]


#run server manually
# docker run -p 8080:8080 karim/node-v1 