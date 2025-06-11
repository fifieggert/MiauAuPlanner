import { Router, RequestHandler } from 'express';
import catalogoVacinasController from '../controllers/catalogoVacinasController';

const router = Router();

router.post('/catalogo', catalogoVacinasController.create as RequestHandler);
router.get('/catalogo', catalogoVacinasController.findAll as RequestHandler);
router.get('/catalogo/:ID_catalogo', catalogoVacinasController.findById as RequestHandler);
router.put('/catalogo/:ID_catalogo', catalogoVacinasController.update as RequestHandler);
router.delete('/catalogo/:ID_catalogo', catalogoVacinasController.delete as RequestHandler);

export default router;