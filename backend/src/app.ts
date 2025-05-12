import  express, {Request, Response}  from 'express'
import userRouter from './routes/userRoutes'
import animalRouter from './routes/animalRoutes'
import especieRouter from './routes/especieRoutes'
import alergiaRouter from './routes/alergiaRoutes'
import historicoRouter from './routes/historicoRoutes'
import compromissosRouter from './routes/compromissosRoutes'
import catalgoRouter from './routes/catalogoVacinasRoutes'
import compromissosVacinasRouter from './routes/compromissosVacinasRoutes'
import historicoVacinasRouter from './routes/historicoVacinasRoutes'
import VacinasAplicadasRouter from './routes/vacinasAplicadasRoutes'


const app = express();

app.use(express.json());

app.use(userRouter);
app.use(animalRouter);
app.use(especieRouter);
app.use(alergiaRouter);
app.use(historicoRouter);
app.use(compromissosRouter);
app.use(catalgoRouter);
app.use(compromissosVacinasRouter);
app.use(historicoVacinasRouter);
app.use(VacinasAplicadasRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});