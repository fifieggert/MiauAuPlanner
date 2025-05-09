import { Request, Response } from "express";
import AnimalRepositorie from "../repositories/animalRepositories";

const AnimalController = {
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
    create: (req: Request, res: Response) => {
        const { nome, raca, idade, genero, peso, id_usuario, id_especie } = req.body;
        AnimalRepositorie.create(nome, raca, idade, genero, peso, id_usuario, id_especie, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(201).json({ message: "Animal criado com sucesso", result });
        });
    },
    findAll: (req: Request, res: Response) => {
        AnimalRepositorie.findAll((err, animal) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(201).json(animal);
        });
    },
    findByID: (req: Request, res: Response) => {
        const { ID_animal } = req.params;
        AnimalRepositorie.findById((ID_animal), (err, animal) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            if (!animal) return res.status(404).json({ error: "Animal não encontrado" });
            res.status(200).json(animal);
        });
    },
    update: (req: Request, res: Response) => {
        const ID_animal = Number(req.params.ID_animal);
        const { nome, raca, idade, genero, peso } = req.body;
        console.log("ID_animal recebido:", ID_animal);
        console.log("Dados recebidos:", { nome, raca, idade, genero, peso });

        AnimalRepositorie.update(ID_animal, nome, raca, idade, genero, peso, (err, result) => {
            if (err) {
                console.error("Erro no update:", err);
                return res.status(500).json({ error: "Erro no servidor", details: err });
            }
            res.status(200).json({ message: "Animal atualizado com sucesso", result });
        });
    },
    delete: (req: Request, res: Response) => {
        const { ID_animal } = req.params;
        AnimalRepositorie.delete((ID_animal), (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(200).json({ message: "Usuário deletado com sucesso", result });
        });
    }
}

export default AnimalController;