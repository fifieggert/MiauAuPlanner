import { Router } from 'express';
import alergiaController from '../controllers/alergiaController';

const router = Router();

router.post('/alergia', alergiaController.create);      
router.get('/alergia', alergiaController.findAll);       
router.get('/alergia/:ID_alergia', alergiaController.findById); 
router.put('/alergia/:ID_alergia', alergiaController.update)
router.delete('/alergia/:ID_alergia', alergiaController.delete); 

export default router;