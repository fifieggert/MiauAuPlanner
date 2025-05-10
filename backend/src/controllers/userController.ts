import { Request, Response } from "express";
import UserRepository from "../repositories/userRepositories";

const userController = {
  create: (req: Request, res: Response) => {
    const { nome, telefone, email, cpf } = req.body;
    UserRepository.create(nome, telefone, cpf, email, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(201).json({ message: "Usuário criado com sucesso", result });
    });
  },

  findAll: (req: Request, res: Response) => {
    UserRepository.findAll((err, users) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(users);
    });
  },

  findById: (req: Request, res: Response) => {
    const { ID_usuario } = req.params;
    UserRepository.findById((ID_usuario), (err, user) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      res.status(200).json(user);
    });
  },

  update: (req: Request, res: Response) => {
    const ID_usuario = Number(req.params.ID_usuario);
    const { nome, telefone, email, cpf } = req.body;
    console.log("ID_usuario recebido:", ID_usuario);
    console.log("Dados recebidos:", { nome, telefone, email, cpf });

    UserRepository.update(ID_usuario, nome, telefone, email, (err, result) => {
      if (err) {
        console.error("Erro no update:", err);
        return res.status(500).json({ error: "Erro no servidor", details: err });
      }
      res.status(200).json({ message: "Usuário atualizado com sucesso", result });
    });
  },

  delete: (req: Request, res: Response) => {
    const { ID_usuario } = req.params;
    console.log(ID_usuario, 'teste')
    UserRepository.delete(ID_usuario, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json({ message: "Usuário deletado com sucesso", result });
    });
  },
};

export default userController;
