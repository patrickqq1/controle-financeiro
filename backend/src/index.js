import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import cron from 'node-cron'
import { insertSaldoDiario } from './controllers/financController.js'
import { userValidation } from './middlewares/valdidateToken.js'

cron.schedule('35 23 * * *', () => {
  insertSaldoDiario();
}, {
  timezone: 'America/Sao_Paulo'
});


const app = express()
app.use(cors())
app.use(express.json())
app.delete('/delete/financs/:id', routes)

app.post('/registerfinanc', routes)
app.post('/post/goals', routes)
app.get('/get/renderFinancs', routes)
app.get('/financssoma', routes)
app.get('/minussoma', routes)
app.get('/get/goals', routes)
app.put('/put/goals/add/:id', routes)
app.put("/put/goals/remove/:id", routes)
app.get("/get/balance", routes)
app.get("/get/diarybalance", routes)
app.post("/post/user", routes)
app.post("/post/login", routes)
app.delete("/delete/goals/:id", routes);
app.put("/put/editfinancs/:id", routes)

app.listen(8800, () => {
    console.log('Servidor iniciado na porta 8800')
} )
