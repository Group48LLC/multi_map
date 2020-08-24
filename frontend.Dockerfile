


FROM ubuntu:18.04

# RUN apt-get update; \
#     apt-get install -y curl gnupg; \
#     curl -sL https://deb.nodesource.com/setup_12.x | bash -; \
#     apt-get install -y nodejs; \
#     rm -rf /var/lib/apt/lists/*


# RUN apt-get update 
# RUN apt-get install -y wget
# RUN apt-get install curl wget
# RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
# RUN apt-get install -y nodejs
# RUN apt-get install -y npm
# RUN node -version

# WORKDIR /app
# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./
# RUN npm install --verbose
# # If you are building your code for production
# # RUN npm install --only=production
# # Bundle app source
# COPY . .
# EXPOSE 8080
# CMD [ "npm", "start" ]

