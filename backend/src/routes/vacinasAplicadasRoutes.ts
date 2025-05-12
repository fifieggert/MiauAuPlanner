import { Router } from 'express';
import vacinaAplicadasController from '../controllers/vacinasAplicadasController';

const router = Router();

router.post('/vacina', vacinaAplicadasController.create);      
router.get('/vacina', vacinaAplicadasController.findAll);       
router.get('/vacina/:ID_vacina', vacinaAplicadasController.findById); 
router.put('/vacina/:ID_vacina', vacinaAplicadasController.update)
router.delete('/vacina/:ID_vacina', vacinaAplicadasController.delete); 

export default router;