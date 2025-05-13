import { Router } from 'express';
import catalogoVacinasController from '../controllers/catalogoVacinasController';

const router = Router();

router.post('/catalogo', catalogoVacinasController.create);
router.get('/catalogo', catalogoVacinasController.findAll);
router.get('/catalogo/:ID_catalogo', catalogoVacinasController.findById);
router.put('/catalogo/:ID_catalogo', catalogoVacinasController.update)
router.delete('/catalogo/:ID_catalogo', catalogoVacinasController.delete);

export default router;