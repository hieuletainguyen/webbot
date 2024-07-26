FROM alpine:latest
WORKDIR /app
COPY . .
RUN apk add --update nodejs npm
RUN npm install 
ENV PORT=3000
EXPOSE 3000
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
VOLUME [ "/frontend-app" ]
CMD ["npm", "start"]