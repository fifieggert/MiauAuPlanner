import { Router, RequestHandler } from 'express';
import historicoController from '../controllers/hitoricoController';

const router = Router();

router.post('/historico', historicoController.create as RequestHandler);
router.get('/historico', historicoController.findAll as RequestHandler);
router.get('/historico/:ID_historico', historicoController.findById as RequestHandler);
router.put('/historico/:ID_historico', historicoController.update as RequestHandler);
router.delete('/historico/:ID_historico', historicoController.delete as RequestHandler);

export default router;