import 'reflect-metadata'
import express, { json } from 'express'

const port = 4001

const app = express()

app.use(json())

app.get('/', (req, res) => {
  res.json({ message: 'User control' })
})

app.listen(port, () => console.log(`rodando na porta ${port}`))
