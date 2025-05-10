import { Request, Response } from "express";
import EspecieRepositorie from "../repositories/especieRepositories";

const especieController = {
  create: (req: Request, res: Response) => {
    const { especie } = req.body;
    EspecieRepositorie.create(especie, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(201).json({ message: "Espécie criada com sucesso", result });
    });
  },

  findAll: (req: Request, res: Response) => {
    EspecieRepositorie.findAll((err, especie) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(especie);
    });
  },

  findById: (req: Request, res: Response) => {
    const { ID_especie } = req.params;
    console.log("ID recebido:", ID_especie);
    EspecieRepositorie.findById(ID_especie, (err, especie) => {
      console.log("Erro:", err);
      console.log("Resultado:", especie);
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!especie) return res.status(404).json({ error: "Espécie não encontrada" });
      res.status(200).json(especie);
    });
  },

  update: (req: Request, res: Response) => {
    const ID_especie = Number(req.params.ID_especie);
    const { especie } = req.body;
    console.log("ID_especie recebido:", ID_especie);
    console.log("Dados recebidos:", { especie });

    EspecieRepositorie.update(ID_especie, especie, (err, result) => {
      if (err) {
        console.error("Erro no update:", err);
        return res.status(500).json({ error: "Erro no servidor", details: err });
      }
      res.status(200).json({ message: "Espécie atualizado com sucesso", result });
    });
  },

  delete: (req: Request, res: Response) => {
    const { ID_especie } = req.params;
    console.log(ID_especie, 'teste')
    EspecieRepositorie.delete(ID_especie, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json({ message: "Espécie deletada com sucesso", result });
    });
  },
};

export default especieController;