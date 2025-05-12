import { Router } from 'express';
import compromissosVacinasController from '../controllers/compromissoVacinasController';

const router = Router();

router.post('/compromissoVacina', compromissosVacinasController.create);      
router.get('/compromissoVacina', compromissosVacinasController.findAll);       
router.get('/compromissoVacina/:ID_catalogo', compromissosVacinasController.findById); 
router.put('/compromissoVacina/:ID_catalogo', compromissosVacinasController.update)
router.delete('/compromissoVacina/:ID_catalogo', compromissosVacinasController.delete); 

export default router;