import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import cron from 'node-cron'
import { insertSaldoDiario } from './controllers/financController.js'

cron.schedule('35 23 * * *', () => {
  insertSaldoDiario();
}, {
  timezone: 'America/Sao_Paulo'
});

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(8800, () => {
    console.log('Servidor iniciado na porta 8800')
} )
