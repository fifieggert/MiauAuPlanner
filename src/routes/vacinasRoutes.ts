import { Router } from 'express';
import vacinaController from '../controllers/vacinasController';

const router = Router();

router.post('/vacina', vacinaController.create);      
router.get('/vacina', vacinaController.findAll);       
router.get('/vacina/:ID_vacina', vacinaController.findById); 
router.put('/vacina/:ID_vacina', vacinaController.update)
router.delete('/vacina/:ID_vacina', vacinaController.delete); 

export default router;