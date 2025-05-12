import { Router } from 'express';
import compromissosController from '../controllers/compromissoController';

const router = Router();

router.post('/compromisso', compromissosController.create);      
router.get('/compromisso', compromissosController.findAll);       
router.get('/compromisso/:ID_compromisso', compromissosController.findById); 
router.put('/compromisso/:ID_compromisso', compromissosController.update)
router.delete('/compromisso/:ID_compromisso', compromissosController.delete); 

export default router;