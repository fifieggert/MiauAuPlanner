import { Router } from 'express';
import usuarioController from '../controllers/usuarioController';

const router = Router();

router.post('/usuario', usuarioController.create);
router.get('/usuario', usuarioController.findAll);
router.get('/usuario/:ID_usuario', usuarioController.findById);
router.put('/usuario/:ID_usuario', usuarioController.update)
router.delete('/usuario/:ID_usuario', usuarioController.delete);

export default router;