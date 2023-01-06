import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'

const connectOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'test',
  database: 'postgres',
  synchronize: true,
  entities: [`${path.join(__dirname, '/entities/*{.ts}')}`],
  migrations: [`${path.join(__dirname, '/migrations/*{.ts}')}`]
}

export const DB = new DataSource(connectOptions)

export const initDB = async () => {
  const database = await DB.initialize()

  return database
}
