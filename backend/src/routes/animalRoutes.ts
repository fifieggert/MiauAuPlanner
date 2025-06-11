import { Router, RequestHandler } from 'express';
import AnimalController from '../controllers/animalController';

const router = Router();

router.post('/animal', AnimalController.create as RequestHandler);
router.get('/animal', AnimalController.findAll as RequestHandler);
router.get('/animal/:ID_animal', AnimalController.findByID as RequestHandler);
router.put('/animal/:ID_animal', AnimalController.update as RequestHandler);
router.delete('/animal/:ID_animal', AnimalController.delete as RequestHandler);

export default router;