import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/users', userController.create);      
router.get('/users', userController.findAll);       
router.get('/users/:ID_usuario', userController.findById); 
router.put('/users/:ID_usuario', userController.update)
router.delete('/users/:ID_usuario', userController.delete); 

export default router;