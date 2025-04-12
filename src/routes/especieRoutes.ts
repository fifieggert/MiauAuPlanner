import { Router } from 'express';
import especieController from '../controllers/especieController';

const router = Router();

router.post('/especie', especieController.create);      
router.get('/especie', especieController.findAll);       
router.get('/especie/:ID_especie', especieController.findById); 
router.put('/especie/:ID_especie', especieController.update)
router.delete('/especie/:ID_especie', especieController.delete); 

export default router;