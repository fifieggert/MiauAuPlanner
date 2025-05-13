import { Request, Response } from "express";
import catalogoVacinasRepositorie from "../repositories/catalogoVacinasRepositories";

const catalogoVacinasController = {
  create: (req: Request, res: Response) => {
    const { nome_vacina, fabricante } = req.body;
    catalogoVacinasRepositorie.create(nome_vacina, fabricante, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(201).json({ message: "Vacina criada com sucesso", result })
    });
  },
  findAll: (req: Request, res: Response) => {
    catalogoVacinasRepositorie.findAll((err, catalogo) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(catalogo);
    });
  },
  findById: (req: Request, res: Response) => {
    const { ID_catalogo } = req.params;
    catalogoVacinasRepositorie.findById((ID_catalogo), (err, catalogo) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!catalogo) return res.status(404).json({ error: "Vacina não encontrada" });
      res.status(200).json(catalogo);
    });
  },
  update: (req: Request, res: Response) => {
    const ID_catalogo = (req.params.ID_catalogo);
    const { nome_vacina, fabricante } = req.body;
    console.log("ID_catalogo recebido:", ID_catalogo);
    console.log("Dados recebidos:", { nome_vacina, fabricante, ID_catalogo });

    catalogoVacinasRepositorie.update(ID_catalogo, nome_vacina, fabricante, (err, result) => {
      if (err) {
        console.error("Erro no update:", err);
        return res.status(500).json({ error: "Erro no servidor", details: err });
      }
      res.status(200).json({ message: "Vacina atualizada com sucesso", result });
    });
  },

  delete: (req: Request, res: Response) => {
    const { ID_catalogo } = req.params;
    console.log(ID_catalogo, 'teste')
    catalogoVacinasRepositorie.delete(ID_catalogo, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json({ message: "Vacina deletada com sucesso", result });
    });
  },
};

export default catalogoVacinasController;