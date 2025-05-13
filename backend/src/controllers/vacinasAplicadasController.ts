import { Request, Response } from "express";
import vacinasAplicadasRepositorie from "../repositories/vacinasAplicadasRepositories";

const vacinaAplicadasController = {
  create: (req: Request, res: Response) => {
    const { ID_catalogo, dose, ID_animal, data_aplicacao } = req.body;
    vacinasAplicadasRepositorie.create(ID_catalogo, dose, ID_animal, data_aplicacao, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(201).json({ message: "Vacina criada com sucesso" });
    });
  },
  findAll: (req: Request, res: Response) => {
    vacinasAplicadasRepositorie.findAll((err, vacina) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(vacina);
    });
  },
  findById: (req: Request, res: Response) => {
    const { ID_vacina } = req.params;
    vacinasAplicadasRepositorie.findById(ID_vacina, (err, vacina) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!vacina) return res.status(404).json({ message: "Vacina não encontrada" });
      res.status(200).json(vacina);
    });
  },

update: (req: Request, res: Response) => {
  const ID_vacina = Number(req.params.ID_vacina);  // Corrigido aqui
  const { dose, data_aplicacao } = req.body;

  console.log("ID_vacina recebido:", ID_vacina);
  console.log("Dados recebidos:", { dose, data_aplicacao });

  vacinasAplicadasRepositorie.update(ID_vacina, dose, data_aplicacao, (err, result) => {
    if (err) {
      console.error("Erro no update:", err);
      return res.status(500).json({ error: "Erro no servidor", details: err });
    }

    res.status(200).json({ message: "Vacina atualizada com sucesso", result });
  });
},


  delete: (req: Request, res: Response) => {
    const { ID_vacina } = req.params;
    vacinasAplicadasRepositorie.delete(ID_vacina, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json({ message: "Vacina deletada com sucesso", result });
    });
  }
};

export default vacinaAplicadasController;