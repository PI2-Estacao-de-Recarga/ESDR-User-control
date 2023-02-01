import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'

const connectOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // database: process.env.DATABASE,
  // url: process.env.DATABASE_URL,
  // port: Number(process.env.DB_PORT),
  // host: process.env.HOST,
  // password: process.env.PASSWORD,
  // username: process.env.USER,
  synchronize: true,
  migrationsRun: true,
  entities: [`${path.join(__dirname, '/entities/*.js')}`],
  migrations: [`${path.join(__dirname, '/migrations/*.js')}`],
  ssl: { rejectUnauthorized: false }
}

export const dataSource = new DataSource(connectOptions)