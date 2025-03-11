import express from 'express'
import cors from 'cors'

//porta do servidor 
const PORT = process.env.PORT || 4000

// host do servidor 
const HOSTNME = process.env.HOSTNAME || 'http://localhost'

// app express
const app = express()

// endpoint raiz 
app.get('/', (req, res) => {
    res.send('Bem vindo!')
})

//cors
app.use(cors({
    origin: ['http://localhost:3000']
}))

// resposta padrão para outras requisições
app.use((req, res) => {
    res.status(404)
})

//inicia o servidor 
app.listen(PORT, () => {
    console.log('Servidor rodando com sucesso ${HOSTNAME}: ${port}')
})