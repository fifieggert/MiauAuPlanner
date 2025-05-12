import { Router } from 'express';
import historicoVacinasController from '../controllers/historicoVacinasController';

const router = Router();

router.post('/historicoVacina', historicoVacinasController.create);      
router.get('/historicoVacina', historicoVacinasController.findAll);       
router.get('/historicoVacina/:ID', historicoVacinasController.findById); 
router.delete('/historicoVacina/:ID', historicoVacinasController.delete); 

export default router;