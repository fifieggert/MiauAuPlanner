import { Router } from 'express';
import AnimalController from '../controllers/animalController';

const router = Router();

router.post('/animal', AnimalController.create);
router.get('/animal', AnimalController.findAll);
router.get('/animal/:ID_animal', AnimalController.findByID);
router.put('/animal/:ID_animal', AnimalController.update)
router.delete('/animal/:ID_animal', AnimalController.delete);

export default router;