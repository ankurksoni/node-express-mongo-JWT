# The first thing we need to do is define from what image we want to build from. 
# Here we will use the latest LTS (long term support) version 18 of node available from the Docker Hub
FROM node:18-alpine As PROD_BUILD_INTERMEDIATE

# Next we create a directory to hold the application code inside the image,
# this will be the working directory for your application:
WORKDIR /usr/src/app


# This image comes with Node.js and NPM already installed so the next thing we need to do is to install 
# your app dependencies using the npm binary. Please note that if you are using npm version 4 or
# a package-lock.json file will not be generated.
COPY --chown=node:node package*.json ./
COPY --chown=node:node public* ./
COPY --chown=node:node views* ./
COPY --chown=node:node app.js ./

# This command will not install upgraded pkgs. for more visit link
# https://stackoverflow.com/a/76219090/3296607
RUN npm ci install --production

# To bundle your app's source code inside the Docker image,
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

FROM node:18-alpine As PROD

# Copy the bundled code from the PROD_BUILD_INTERMEDIATE stage to the PROD image
COPY --chown=node:node --from=PROD_BUILD_INTERMEDIATE /usr/src/app/node_modules /opt/node-jwt/node_modules
COPY --chown=node:node --from=PROD_BUILD_INTERMEDIATE /usr/src/app /opt/node-jwt

RUN apk add --no-cache curl

EXPOSE 3000
ENV NODE_ENV=production
ENV AWS_NODEJS_CONNECTION_REUSE_ENABLED=1

CMD ["node", "/opt/node-jwt/main.js"]