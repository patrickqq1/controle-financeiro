import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import cron from 'node-cron'
import { insertSaldoDiario } from './controllers/financController.js'
require('dotenv').config()

cron.schedule('35 23 * * *', () => {
  insertSaldoDiario();
}, {
  timezone: 'America/Sao_Paulo'
});

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log('Servidor iniciado na porta 8800')
} )
