import { Router } from 'express';
import compromissosController from '../controllers/compromissoController';

const router = Router();

/**
 * @swagger
 * /compromisso:
 *   post:
 *     summary: Cria um novo compromisso
 *     description: Endpoint para criar um novo compromisso no sistema
 *     tags:
 *       - Compromisso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_compromissos:
 *                 type: string
 *               ID_animal:
 *                 type: number
 *               obrservacoes:
 *                 type: string
 *               ID_vacina:
 *                 type: number
 *               ID_usuario:
 *                 type: number
 *               ID_veterinario:
 *                 type: number
 *               ID_clinica:
 *                 type: number
 */
router.post('/compromisso', compromissosController.create);      
router.get('/compromisso', compromissosController.findAll);       
router.get('/compromisso/:ID_compromisso', compromissosController.findById); 
router.put('/compromisso/:ID_compromisso', compromissosController.update)
router.delete('/compromisso/:ID_compromisso', compromissosController.delete); 

export default router;