import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'

const connectOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'test',
  database: 'user',
  synchronize: true,
  entities: [`${path.join(__dirname, '/entities/*{.ts, .js}')}`],
  migrations: [`${path.join(__dirname, '/migrations/*{.ts, .js}')}`]
}

export const dataSource = new DataSource(connectOptions)
