import { Request, Response } from "express";
import historicoVacinasRepositorie from "../repositories/historicoVacinasRepositories";

const historicoVacinasController = {
    create: (req: Request, res: Response) => {
        const {ID_historico, ID_vacina} = req.body;
        historicoVacinasRepositorie.create(ID_historico, ID_vacina, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor"});
            res.status(201).json({ message: "Evento criado com sucesso", result})
        });
    },
    findAll: (req: Request, res: Response) => {
        historicoVacinasRepositorie.findAll((err, historicoVacina) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json(historicoVacina);
        });
    },
    findById: (req: Request, res: Response) => {
        const { ID } = req.params;
        historicoVacinasRepositorie.findById((ID), (err, historicoVacina) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          if (!historicoVacina) return res.status(404).json({ error: "Evento não encontrado" });
          res.status(200).json(historicoVacina);
        });
    },
      delete: (req: Request, res: Response) => {
        const { ID } = req.params;
        console.log(ID, 'teste')
        historicoVacinasRepositorie.delete(ID, (err, result) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json({ message: "Compromisso deletado com sucesso", result });
        });
      },
    };

export default historicoVacinasController;