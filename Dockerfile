FROM node:8

EXPOSE 3002

RUN mkdir /explorer
WORKDIR /explorer

COPY . . 
RUN rm -rf grafana-provisioning bitcore node_modules docker
RUN npm install

CMD npm start 
