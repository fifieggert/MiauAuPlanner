import express from 'express';
import cors from 'cors';
import setupSwagger from './routes/swagger';

import userRouter from './routes/userRoutes';
import animalRouter from './routes/animalRoutes';
import especieRouter from './routes/especieRoutes';
import alergiaRouter from './routes/alergiaRoutes';
import historicoRouter from './routes/historicoRoutes';
import compromissoRouter from './routes/compromissosRoutes';
import vacinaRouter from './routes/vacinasRoutes';

const app = express();

// Enable CORS
app.use(cors());

setupSwagger(app);

app.use(express.json());

app.use(userRouter);
app.use(animalRouter);
app.use(especieRouter);
app.use(alergiaRouter);
app.use(historicoRouter);
app.use(compromissoRouter);
app.use(vacinaRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
