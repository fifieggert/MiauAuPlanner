import { Request, Response } from "express";
import AnimalRepositorie from "../repositories/animalRepositories";

const AnimalController = {
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