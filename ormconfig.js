const { DataSource } = require('typeorm');
const dotenv = require('dotenv');
dotenv.config();

module.exports = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/migration/*.js'],
  migrationsTableName: 'migrations_typeorm',
})
