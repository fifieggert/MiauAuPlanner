import { Request, Response } from "express";
import compromissosVacinasRepositorie from "../repositories/compromissosVacinasRepositories";

const compromissosVacinasController = {
    create: (req: Request, res: Response) => {
        const {ID_compromissos, ID_catalogo, dose_prevista} = req.body;
        compromissosVacinasRepositorie.create(ID_compromissos, ID_catalogo, dose_prevista, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor"});
            res.status(201).json({ message: "Evento criado com sucesso", result})
        });
    },
    findAll: (req: Request, res: Response) => {
        compromissosVacinasRepositorie.findAll((err, compromissoVacina) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json(compromissoVacina);
        });
    },
    findById: (req: Request, res: Response) => {
        const { ID } = req.params;
        compromissosVacinasRepositorie.findById((ID), (err, compromissoVacina) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          if (!compromissoVacina) return res.status(404).json({ error: "Evento não encontrado" });
          res.status(200).json(compromissoVacina);
        });
    },
    update: (req: Request, res: Response) => {
        const ID = (req.params.ID);
        const { dose_prevista } = req.body;
        console.log("ID recebido:", ID);
        console.log("Dados recebidos:", {dose_prevista, ID });
    
        compromissosVacinasRepositorie.update(ID, dose_prevista, (err, result) => {
          if (err) {
            console.error("Erro no update:", err);
            return res.status(500).json({ error: "Erro no servidor", details: err });
          }
          res.status(200).json({ message: "Evento atualizado com sucesso", result });
        });
      },
      delete: (req: Request, res: Response) => {
        const { ID } = req.params;
        console.log(ID, 'teste')
        compromissosVacinasRepositorie.delete(ID, (err, result) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json({ message: "Compromisso deletado com sucesso", result });
        });
      },
    };

export default compromissosVacinasController;