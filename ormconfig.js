const { DataSource } = require('typeorm');
const dotenv = require('dotenv');
dotenv.config();

module.exports = new DataSource({
  type: 'mysql',
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "malospasosdb",
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['migrations/*.js'],
  migrationsTableName: 'migrations_typeorm',
})
