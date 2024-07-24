FROM alpine:latest
WORKDIR /backend-app
COPY . .
RUN apk add --update nodejs npm
RUN npm install

EXPOSE 9897
VOLUME [ "/backend-app" ]
CMD ["npm", "start"]
