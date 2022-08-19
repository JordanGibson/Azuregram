FROM node:16
WORKDIR /usr/src/app
ENV DATABASE_URL=postgres://postgres:Password1@azuregramdb.postgres.database.azure.com/azuregramdb?sslmode=require
RUN npm i -g pnpm
COPY package*.json ./
COPY prisma ./prisma/
RUN pnpm ci --only=production
RUN pnpx prisma generate
RUN pnpm run
COPY . .
EXPOSE 8080
CMD ["pnpm", "start"]