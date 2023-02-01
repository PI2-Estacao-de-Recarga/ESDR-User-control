import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'

const connectOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DATABASE,
  url: process.env.DATABASE_URL,
  port: Number(process.env.DB_PORT),
  host: process.env.HOST,
  password: process.env.PASSWORD,
  username: process.env.USER,
  synchronize: true,
  entities: [`${path.join(__dirname, '/entities/*{.ts, .js}')}`],
  migrations: [`${path.join(__dirname, '/migrations/*{.ts, .js}')}`],
  migrationsRun: true,
  ssl: { rejectUnauthorized: false }
}

export const dataSource = new DataSource(connectOptions)
