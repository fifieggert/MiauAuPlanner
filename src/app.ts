import  express, {Request, Response}  from 'express'
import userRouter from './routes/userRoutes'
import animalRouter from './routes/animalRoutes'

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(animalRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});