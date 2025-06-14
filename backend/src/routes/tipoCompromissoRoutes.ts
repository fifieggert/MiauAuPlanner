import { Router, RequestHandler } from 'express';
import tipoCompromissoController from '../controllers/tipoCompromissoController';

const router = Router();

router.get('/tipos', tipoCompromissoController.findAll as RequestHandler);
router.get('/tipos/:ID_tipo', tipoCompromissoController.findById as RequestHandler);

export default router; 