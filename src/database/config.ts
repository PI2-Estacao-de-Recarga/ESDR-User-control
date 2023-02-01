import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'

const connectOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  url: process.env.DATABASE_URL,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: [`${path.join(__dirname, '/entities/*{.ts, .js}')}`],
  migrations: [`${path.join(__dirname, '/migrations/*{.ts, .js}')}`],
  migrationsRun: true
}

export const dataSource = new DataSource(connectOptions)
