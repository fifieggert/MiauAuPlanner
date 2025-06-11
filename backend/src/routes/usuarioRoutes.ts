import { Router, RequestHandler } from 'express';
import usuarioController from '../controllers/usuarioController';

const router = Router();

router.post('/usuario', usuarioController.create as RequestHandler);
router.get('/usuario', usuarioController.findAll as RequestHandler);
router.get('/usuario/:ID_usuario', usuarioController.findById as RequestHandler);
router.put('/usuario/:ID_usuario', usuarioController.update as RequestHandler);
router.delete('/usuario/:ID_usuario', usuarioController.delete as RequestHandler);

export default router;