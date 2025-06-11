import { Router, RequestHandler } from 'express';
import alergiaController from '../controllers/alergiaController';

const router = Router();

router.post('/alergia', alergiaController.create as RequestHandler);
router.get('/alergia', alergiaController.findAll as RequestHandler);
router.get('/alergia/:ID_alergia', alergiaController.findById as RequestHandler);
router.put('/alergia/:ID_alergia', alergiaController.update as RequestHandler);
router.delete('/alergia/:ID_alergia', alergiaController.delete as RequestHandler);

export default router;