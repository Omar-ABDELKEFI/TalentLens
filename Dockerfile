FROM node:13.7.0 as build-stage


WORKDIR /app

RUN apt-get -y install openssh-client
ADD .ssh/id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa


RUN echo "StrictHostKeyChecking no " > /root/.ssh/config


COPY package.json ./
RUN npm -v
RUN node -v
RUN npm install
COPY . .
RUN npm run build



# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/public/ /usr/share/nginx/html/
COPY --from=build-stage /app/build/ /usr/share/nginx/html/
COPY  configs/certs/ /usr/local/etc/nginx/

COPY  nginx/nginx.conf /etc/nginx/conf.d/default.conf


#CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

RUN ls -la

# Make our shell script executable
RUN chmod +x env.sh
RUN ls -la
RUN nginx -v

# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]