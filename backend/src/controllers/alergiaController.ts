import { Request, Response } from "express";
import AlergiaRepositorie from "../repositories/alergiaRepositories";

const alergiaController = {
  create: (req: Request, res: Response) => {
    const { ID_animal, descricao } = req.body;
    AlergiaRepositorie.create(ID_animal, descricao, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(201).json({ message: "Alergia criada com sucesso", result });
    });
  },

  findAll: (req: Request, res: Response) => {
    AlergiaRepositorie.findAll((err, alergia) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(alergia);
    });
  },

  findById: (req: Request, res: Response) => {
    const { ID_alergia } = req.params;
    AlergiaRepositorie.findById((ID_alergia), (err, alergia) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!alergia) return res.status(404).json({ error: "Alergia não encontrada" });
      res.status(200).json(alergia);
    });
  },

  update: (req: Request, res: Response) => {
    const ID_alergia = (req.params.ID_alergia);
    const { descricao } = req.body;
    console.log("ID_alergia recebido:", ID_alergia);
    console.log("Dados recebidos:", { descricao });

    AlergiaRepositorie.update(ID_alergia, descricao, (err, result) => {
      if (err) {
        console.error("Erro no update:", err);
        return res.status(500).json({ error: "Erro no servidor", details: err });
      }
      res.status(200).json({ message: "Alergia atualizado com sucesso", result });
    });
  },

  delete: (req: Request, res: Response) => {
    const { ID_alergia } = req.params;
    console.log(ID_alergia, 'teste')
    AlergiaRepositorie.delete(ID_alergia, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json({ message: "Alergia deletado com sucesso", result });
    });
  },
};

export default alergiaController;