import { Router } from 'express';
import historicoController from '../controllers/hitoricoController';

const router = Router();

router.post('/historico', historicoController.create);
router.get('/historico', historicoController.findAll);
router.get('/historico/:ID_historico', historicoController.findById);
router.put('/historico/:ID_historico', historicoController.update)
router.delete('/historico/:ID_historico', historicoController.delete);

export default router;