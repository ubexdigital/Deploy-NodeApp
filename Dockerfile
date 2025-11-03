FROM node:18-alpine

# Install git (needed for npm packages fetched from Git repos)
RUN apk add --no-cache git

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
