import  express, {Request, Response}  from 'express'
import userRouter from './routes/userRoutes'

const app = express();

app.use(express.json());

app.use(userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});