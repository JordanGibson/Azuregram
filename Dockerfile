FROM node:16
WORKDIR /usr/src/app
ENV DATABASE_URL=postgres://postgres:Password1@azuregramdb.postgres.database.azure.com/azuregramdb?sslmode=require
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production
RUN npx prisma generate
RUN npm run build
COPY . .
EXPOSE 8080
CMD ["npm", "start"]