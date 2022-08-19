FROM node:16
WORKDIR /usr/src/app
ENV DATABASE_URL=postgres://postgres:Password1@azuregramdb.postgres.database.azure.com/azuregramdb?sslmode=require
ENV PORT=3000
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
RUN npm ci --only=production
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]