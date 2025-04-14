import  express, {Request, Response}  from 'express'
import userRouter from './routes/userRoutes'
import animalRouter from './routes/animalRoutes'
import especieRouter from './routes/especieRoutes'
import alergiaRouter from './routes/alergiaRoutes'
import historicoRouter from './routes/historicoRoutes'
import compromissoRouter from './routes/compromissosRoutes'


const app = express();

app.use(express.json());

app.use(userRouter);
app.use(animalRouter);
app.use(especieRouter);
app.use(alergiaRouter);
app.use(historicoRouter);
app.use(compromissoRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});