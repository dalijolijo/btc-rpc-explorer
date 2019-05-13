FROM ubuntu:16.04

ARG url
ENV URL=$url
ARG email
ENV EMAIL=$email

# Change sh to bash
SHELL ["/bin/bash", "-c"]

EXPOSE 3002
EXPOSE 80
EXPOSE 443

RUN mkdir /explorer
WORKDIR /explorer

COPY . . 
RUN rm -rf grafana-provisioning bitcore node_modules docker

RUN apt update && \
    apt -y upgrade && \
    apt install -y curl git python-software-properties software-properties-common nginx gcc g++ make sudo
#RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
## LTS release of NodeJS as of 2018-11-29, via https://nodejs.org/en/
#RUN nvm install 10.14.1 
#RUN source ~/.profile && \
#    nvm ls-remote && \
#    nvm install 10.14.1 && \
#    nvm alias default 10.14.1 && \
#    nvm use default
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs && \
    apt-get install -y build-essential
RUN npm install pm2 --global
RUN add-apt-repository ppa:certbot/certbot && \
    apt update && \
    apt -y upgrade && \
    apt install -y python-certbot-nginx

RUN sed -i s/URL/$URL/g btc-explorer.com.conf && \
    cp /explorer/btc-explorer.com.conf /etc/nginx/sites-available/btc-explorer.com.conf
    
RUN certbot --nginx -d $URL -m $EMAIL -n --agree-tos
RUN cd /etc/ssl/certs && \
    openssl dhparam -out dhparam.pem 4096

RUN npm install
RUN npm run build
CMD pm2 start bin/www --name "$URL"
