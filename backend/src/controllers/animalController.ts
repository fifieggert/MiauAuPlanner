import { Request, Response } from "express";
import AnimalRepositorie from "../repositories/animalRepositories";

const AnimalController = {
    create: (req: Request, res: Response) => {
        const { nome, raca, idade, genero, peso, id_usuario, id_especie } = req.body;

        // Validação de dados obrigatórios
        if (!nome || !raca || !idade || !genero || !peso || !id_usuario || !id_especie) {
            return res.status(400).json({ error: "Dados obrigatórios faltando" });
        }

        // Validação de idade
        if (idade < 0) {
            return res.status(400).json({ error: "Idade inválida" });
        }

        // Validação de peso
        if (peso < 0) {
            return res.status(400).json({ error: "Peso inválido" });
        }

        AnimalRepositorie.create(nome, raca, idade, genero, peso, id_usuario, id_especie, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor", details: err.message });
            res.status(201).json({ message: "Animal criado com sucesso", result });
        });
    },
    findAll: (req: Request, res: Response) => {
        AnimalRepositorie.findAll((err, animal) => {
            if (err) return res.status(500).json({ error: "Erro no servidor", details: err.message });
            res.status(200).json(animal);
        });
    },
    findByID: (req: Request, res: Response) => {
        const { ID_animal } = req.params;
        
        // Validação de ID
        if (!ID_animal || isNaN(Number(ID_animal))) {
            return res.status(400).json({ error: "ID inválido" });
        }

        AnimalRepositorie.findById(Number(ID_animal), (err, animal) => {
            if (err) return res.status(500).json({ error: "Erro no servidor", details: err.message });
            if (!animal) return res.status(404).json({ error: "Animal não encontrado" });
            res.status(200).json(animal);
        });
    },
    update: (req: Request, res: Response) => {
        const ID_animal = Number(req.params.ID_animal);
        const { nome, raca, idade, genero, peso } = req.body;

        // Validação de ID
        if (!ID_animal || isNaN(ID_animal)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        // Validação de dados obrigatórios
        if (!nome || !raca || !idade || !genero || !peso) {
            return res.status(400).json({ error: "Dados obrigatórios faltando" });
        }

        // Validação de idade
        if (idade < 0) {
            return res.status(400).json({ error: "Idade inválida" });
        }

        // Validação de peso
        if (peso < 0) {
            return res.status(400).json({ error: "Peso inválido" });
        }

        AnimalRepositorie.update(ID_animal, nome, raca, idade, genero, peso, (err, result) => {
            if (err) {
                console.error("Erro no update:", err);
                return res.status(500).json({ error: "Erro no servidor", details: err.message });
            }
            if (!result) {
                return res.status(404).json({ error: "Animal não encontrado" });
            }
            res.status(200).json({ message: "Animal atualizado com sucesso", result });
        });
    },
    delete: (req: Request, res: Response) => {
        const { ID_animal } = req.params;

        // Validação de ID
        if (!ID_animal || isNaN(Number(ID_animal))) {
            return res.status(400).json({ error: "ID inválido" });
        }

        AnimalRepositorie.delete(Number(ID_animal), (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor", details: err.message });
            if (!result) {
                return res.status(404).json({ error: "Animal não encontrado" });
            }
            res.status(200).json({ message: "Animal deletado com sucesso", result });
        });
    }
}

export default AnimalController;