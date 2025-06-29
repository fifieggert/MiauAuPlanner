import { Router, RequestHandler } from 'express';
import tipoCompromissoController from '../controllers/tipoCompromissoController';

const router = Router();

router.get('/tipos', tipoCompromissoController.findAll as RequestHandler);
router.get('/tipos/:ID_tipo', tipoCompromissoController.findById as RequestHandler);
router.post('/tipos', tipoCompromissoController.create as RequestHandler);
router.put('/tipos/:ID_tipo', tipoCompromissoController.update as RequestHandler);
router.delete('/tipos/:ID_tipo', tipoCompromissoController.delete as RequestHandler);

export default router; 