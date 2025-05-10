import { Router } from 'express';
import AnimalController from '../controllers/animalController';

const router = Router();

/**
 * @swagger
 * /animal:
 *   post:
 *     summary: Cria um novo animal
 *     description: Endpoint para criar um novo animal no sistema
 *     tags:
 *       - Animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - raca
 *               - idade
 *               - genero
 *               - peso
 *               - id_usuario
 *               - id_especie
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do animal
 *               raca:
 *                 type: string
 *                 description: Raça do animal
 *               idade:
 *                 type: number
 *                 description: Idade do animal em anos
 *               genero:
 *                 type: string
 *                 description: Gênero do animal (M/F)
 *               peso:
 *                 type: number
 *                 description: Peso do animal em kg
 *               id_usuario:
 *                 type: number
 *                 description: ID do usuário dono do animal
 *               id_especie:
 *                 type: number
 *                 description: ID da espécie do animal
 *     responses:
 *       201:
 *         description: Animal criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Animal criado com sucesso
 *                 result:
 *                   type: object
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro no servidor
 */
router.post('/animal', AnimalController.create);      

/**
 * @swagger
 * /animal:
 *   get:
 *     summary: Lista todos os animais
 *     description: Retorna uma lista com todos os animais cadastrados
 *     tags:
 *       - Animal
 *     responses:
 *       200:
 *         description: Lista de animais retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_animal:
 *                     type: number
 *                   nome:
 *                     type: string
 *                   raca:
 *                     type: string
 *                   idade:
 *                     type: number
 *                   genero:
 *                     type: string
 *                   peso:
 *                     type: number
 *       500:
 *         description: Erro no servidor
 */
router.get('/animal', AnimalController.findAll);       

/**
 * @swagger
 * /animal/{ID_animal}:
 *   get:
 *     summary: Busca um animal pelo ID
 *     description: Retorna os detalhes de um animal específico
 *     tags:
 *       - Animal
 *     parameters:
 *       - in: path
 *         name: ID_animal
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do animal
 *     responses:
 *       200:
 *         description: Animal encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID_animal:
 *                   type: number
 *                 nome:
 *                   type: string
 *                 raca:
 *                   type: string
 *                 idade:
 *                   type: number
 *                 genero:
 *                   type: string
 *                 peso:
 *                   type: number
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/animal/:ID_animal', AnimalController.findByID); 

/**
 * @swagger
 * /animal/{ID_animal}:
 *   put:
 *     summary: Atualiza um animal
 *     description: Atualiza os dados de um animal existente
 *     tags:
 *       - Animal
 *     parameters:
 *       - in: path
 *         name: ID_animal
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do animal
 *               raca:
 *                 type: string
 *                 description: Raça do animal
 *               idade:
 *                 type: number
 *                 description: Idade do animal em anos
 *               genero:
 *                 type: string
 *                 description: Gênero do animal (M/F)
 *               peso:
 *                 type: number
 *                 description: Peso do animal em kg
 *     responses:
 *       200:
 *         description: Animal atualizado com sucesso
 *       500:
 *         description: Erro no servidor
 */
router.put('/animal/:ID_animal', AnimalController.update)

/**
 * @swagger
 * /animal/{ID_animal}:
 *   delete:
 *     summary: Remove um animal
 *     description: Remove um animal do sistema
 *     tags:
 *       - Animal
 *     parameters:
 *       - in: path
 *         name: ID_animal
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do animal
 *     responses:
 *       200:
 *         description: Animal removido com sucesso
 *       500:
 *         description: Erro no servidor
 */
router.delete('/animal/:ID_animal', AnimalController.delete); 

export default router;