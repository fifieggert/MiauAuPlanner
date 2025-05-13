import express, { Request, Response } from 'express'

import userRouter from './routes/userRoutes'
import animalRouter from './routes/animalRoutes'
import especieRouter from './routes/especieRoutes'
import alergiaRouter from './routes/alergiaRoutes'
import historicoRouter from './routes/historicoRoutes'
import compromissosRouter from './routes/compromissosRoutes'
import catalogoRouter from './routes/catalogoVacinasRoutes'
import VacinasAplicadasRouter from './routes/vacinasAplicadasRoutes'

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(animalRouter);
app.use(especieRouter);
app.use(alergiaRouter);
app.use(historicoRouter);
app.use(compromissosRouter);
app.use(catalogoRouter);
app.use(VacinasAplicadasRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});