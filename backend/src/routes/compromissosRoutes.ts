import { Router, RequestHandler } from 'express';
import compromissosController from '../controllers/compromissoController';

const router = Router();

router.post('/compromisso', compromissosController.create as RequestHandler);
router.get('/compromisso', compromissosController.findAll as RequestHandler);
router.get('/compromisso/:ID_compromisso', compromissosController.findById as RequestHandler);
router.put('/compromisso/:ID_compromisso', compromissosController.update as RequestHandler);
router.delete('/compromisso/:ID_compromisso', compromissosController.delete as RequestHandler);

export default router;