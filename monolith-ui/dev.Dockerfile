FROM node:14-alpine
WORKDIR /next
COPY . .
RUN npm run dev