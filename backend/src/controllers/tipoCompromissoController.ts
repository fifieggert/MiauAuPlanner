import { Request, Response } from "express";
import tipoCompromissoRepositorie from "../repositories/tipoCompromissoRepositories";

const tipoCompromissoController = {
    findAll: (req: Request, res: Response) => {
        tipoCompromissoRepositorie.findAll((err, tipos) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(200).json(tipos);
        });
    },
    findById: (req: Request, res: Response) => {
        const { ID_tipo } = req.params;
        tipoCompromissoRepositorie.findById(ID_tipo, (err, tipo) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            if (!tipo) return res.status(404).json({ message: "Tipo de compromisso não encontrado" });
            res.status(200).json(tipo);
        });
    },
    create: (req: Request, res: Response) => {
        const { nome_tipo } = req.body;
        if (!nome_tipo) {
            return res.status(400).json({ error: "Nome do tipo é obrigatório" });
        }
        tipoCompromissoRepositorie.create(nome_tipo, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(201).json({ message: "Tipo de compromisso criado com sucesso", result });
        });
    },
    update: (req: Request, res: Response) => {
        const { ID_tipo } = req.params;
        const { nome_tipo } = req.body;
        if (!nome_tipo) {
            return res.status(400).json({ error: "Nome do tipo é obrigatório" });
        }
        tipoCompromissoRepositorie.update(ID_tipo, nome_tipo, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(200).json({ message: "Tipo de compromisso atualizado com sucesso", result });
        });
    },
    delete: (req: Request, res: Response) => {
        const { ID_tipo } = req.params;
        tipoCompromissoRepositorie.delete(ID_tipo, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            res.status(200).json({ message: "Tipo de compromisso deletado com sucesso", result });
        });
    }
};

export default tipoCompromissoController; 