FROM node:16.18.1

RUN npm i -g pm2

WORKDIR /app/

COPY . .

EXPOSE 80

CMD ["pm2-runtime", "ecosystem.config.js"]