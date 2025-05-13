import { Request, Response } from "express";
import VacinaRepositorie from "../repositories/vacinasRepositories";

const vacinaController = {
  create: (req: Request, res: Response) => {
    const { nome_vacina, dose, fabricante, ID_animal, ID_historico } = req.body;
    VacinaRepositorie.create(nome_vacina, dose, fabricante, ID_animal, ID_historico, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(201).json({ message: "Vacina criada com sucesso", result });
    });
  },

  findAll: (req: Request, res: Response) => {
    VacinaRepositorie.findAll((err, vacina) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(vacina);
    });
  },

  findById: (req: Request, res: Response) => {
    const { ID_vacina } = req.params;
    VacinaRepositorie.findById((ID_vacina), (err, vacina) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!vacina) return res.status(404).json({ error: "Vacina não encontrada" });
      res.status(200).json(vacina);
    });
  },

  update: (req: Request, res: Response) => {
    const ID_vacina = Number(req.params.ID_especie);
    const { nome_vacina, dose, fabricante } = req.body;
    console.log("ID_vacina recebido:", ID_vacina);
    console.log("Dados recebidos:", { nome_vacina, dose, fabricante });

    VacinaRepositorie.update(ID_vacina, nome_vacina, dose, fabricante, (err, result) => {
      if (err) {
        console.error("Erro no update:", err);
        return res.status(500).json({ error: "Erro no servidor", details: err });
      }
      res.status(200).json({ message: "Vacina atualizado com sucesso", result });
    });
  },

  delete: (req: Request, res: Response) => {
    const { ID_vacina } = req.params;
    console.log(ID_vacina, 'teste')
    VacinaRepositorie.delete(ID_vacina, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json({ message: "Vacina deletado com sucesso", result });
    });
  },
};

export default vacinaController;