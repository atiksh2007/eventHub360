// Load the .env file variables into memory
require('dotenv').config();

module.exports = {
  schema: 'src/prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: 'src/prisma/migrations',
  },
};