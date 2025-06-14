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
    }
};

export default tipoCompromissoController; 