import express from 'express'

import userRouter from './routes/usuarioRoutes'
import animalRouter from './routes/animalRoutes'
import alergiaRouter from './routes/alergiaRoutes'
import historicoRouter from './routes/historicoRoutes'
import compromissosRouter from './routes/compromissosRoutes'
import catalogoRouter from './routes/catalogoVacinasRoutes'
import VacinasAplicadasRouter from './routes/vacinasAplicadasRoutes'
import tipoCompromissoRouter from './routes/tipoCompromissoRoutes'
import loginRoutes from './routes/loginRoutes'

const app = express();
const cors = require ( "cors" );

app.use(cors());
app.use(express.json());

// Configurando todas as rotas com o prefixo /api
app.use('/api', userRouter);
app.use('/api', animalRouter);
app.use('/api', alergiaRouter);
app.use('/api', historicoRouter);
app.use('/api', compromissosRouter);
app.use('/api', catalogoRouter);
app.use('/api', VacinasAplicadasRouter);
app.use('/api', tipoCompromissoRouter);
app.use('/api', loginRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;