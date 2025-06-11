import { Router, RequestHandler } from 'express';
import especieController from '../controllers/especieController';

const router = Router();

router.post('/especie', especieController.create as RequestHandler);
router.get('/especie', especieController.findAll as RequestHandler);
router.get('/especie/:ID_especie', especieController.findById as RequestHandler);
router.put('/especie/:ID_especie', especieController.update as RequestHandler);
router.delete('/especie/:ID_especie', especieController.delete as RequestHandler);

export default router;