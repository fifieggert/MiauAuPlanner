import { Router, RequestHandler } from 'express';
import vacinaAplicadasController from '../controllers/vacinasAplicadasController';

const router = Router();

router.post('/vacina', vacinaAplicadasController.create as RequestHandler);
router.get('/vacina', vacinaAplicadasController.findAll as RequestHandler);
router.get('/vacina/:ID_vacina', vacinaAplicadasController.findById as RequestHandler);
router.put('/vacina/:ID_vacina', vacinaAplicadasController.update as RequestHandler);
router.delete('/vacina/:ID_vacina', vacinaAplicadasController.delete as RequestHandler);

export default router;