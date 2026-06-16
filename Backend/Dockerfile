FROM node:24-alpine

# Tạo folder trong container
WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm run build

COPY . .

EXPOSE 3001

CMD ["npm", "start"]