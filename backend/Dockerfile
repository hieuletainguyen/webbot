FROM node:14
WORKDIR /backend-app
COPY . .
RUN npm install

EXPOSE 9897
VOLUME [ "/backend-app" ]
CMD ["npm", "start"]
