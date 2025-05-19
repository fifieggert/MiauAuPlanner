import { Request, Response } from "express";
import CompromissoRepositorie from "../repositories/compromissosRepositories";

const CompromissoController = {
  create: (req: Request, res: Response) => {
    const { data_compromissos, ID_animal, observacoes } = req.body;
    CompromissoRepositorie.create(data_compromissos, ID_animal, observacoes, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(201).json({ message: "Compromisso criado com sucesso", result })
    });
  },
  findAll: (req: Request, res: Response) => {
    CompromissoRepositorie.findAll((err, compromisso) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(compromisso);
    });
  },
  findById: (req: Request, res: Response) => {
    const { ID_compromissos } = req.params;
    CompromissoRepositorie.findById((ID_compromissos), (err, compromisso) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!compromisso) return res.status(404).json({ error: "Compromisso não encontrado" });
      res.status(200).json(compromisso);
    });
  },
  update: (req: Request, res: Response) => {
    const ID_compromissos = (req.params.ID_compromissos);
    const { data_compromissos, observacoes } = req.body;
    console.log("ID_compromissos recebido:", ID_compromissos);
    console.log("Dados recebidos:", { data_compromissos, observacoes, ID_compromissos });

    CompromissoRepositorie.update(ID_compromissos, data_compromissos, observacoes, (err, result) => {
      if (err) {
        console.error("Erro no update:", err);
        return res.status(500).json({ error: "Erro no servidor", details: err });
      }
      res.status(200).json({ message: "Compromisso atualizado com sucesso", result });
    });
  },

  delete: (req: Request, res: Response) => {
    const { ID_compromissos } = req.params;
    console.log(ID_compromissos, 'teste')
    CompromissoRepositorie.delete(ID_compromissos, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json({ message: "Compromisso deletado com sucesso", result });
    });
  },
};

export default CompromissoController;