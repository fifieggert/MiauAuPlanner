import { Router, RequestHandler } from 'express';
import compromissosController from '../controllers/compromissosController';

const router = Router();

router.post('/compromisso', compromissosController.create as RequestHandler);
router.get('/compromisso', compromissosController.findAll as RequestHandler);
router.get('/compromisso/:ID_compromissos', compromissosController.findById as RequestHandler);
router.put('/compromisso/:ID_compromissos', compromissosController.update as RequestHandler);
router.delete('/compromisso/:ID_compromissos', compromissosController.delete as RequestHandler);

export default router;