FROM node:16.5.0-alpine

# Create and define the node_modules's cache directory.

WORKDIR /app

RUN node -v
RUN apk add  libc6-compat
RUN apk add  openssh-client
RUN apk add  git

#configuration ssh
ADD .ssh/id_ed25519 /root/.ssh/id_ed25519
RUN chmod 600 /root/.ssh/id_ed25519
RUN echo "StrictHostKeyChecking no " > /root/.ssh/config
COPY package.json ./
COPY package-lock.json ./
RUN npm i

#set the working folder for all other commands

ADD . .
RUN ls -la
RUN chmod +x env.sh
RUN npm run env
RUN cp env-config.js ./public
#RUN cp -R /app/node_modules/* /cache/node_modules




#determines the command that will be executed when the container starts
CMD [ "npm", "run", "start"]
#CMD ["/bin/sh","docker cp front-app:/app/node_modules /home/oabdelkefi/htdocs/front-tekab-test/ && ls -la ./node-modules && npm run start"]
#CMD ["/bin/sh", "-c", "ls -la /app/node_modules && ls -la /app/node_modules/ &&  cp -R /cache/node_modules/* /app/node_modules/ && ls -la /app/node_modules/ && pwd && npm run start"]
