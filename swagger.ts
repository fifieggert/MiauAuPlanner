import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MiauAuPlanner API',
      version: '1.0.0',
      description: 'Documentação da API do MiauAuPlanner',
    },
    servers: [
      {
        url: 'http://localhost:3000', // troca pro domínio da Render depois
        description: 'Servidor de desenvolvimento'
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'], // Inclui tanto controladores quanto rotas
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default setupSwagger;
