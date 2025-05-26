import { Request, Response } from "express";
import usuarioRepositorie from "../repositories/usuarioRepositories";
import bcrypt from "bcrypt";

const usuarioController = {
  create: (req: Request, res: Response) => {
    const { nome, telefone, email, cpf, senha } = req.body;

    // Criptografar a senha
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: "Erro ao criptografar senha" });

      usuarioRepositorie.create(nome, telefone, cpf, email, hash, (err, result) => {
        if (err) return res.status(500).json({ error: "Erro no servidor", details: err });
        res.status(201).json({ message: "Usuário criado com sucesso", result });
      });
    });
  },

  findAll: (req: Request, res: Response) => {
    usuarioRepositorie.findAll((err, usuarios) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(usuarios);
    });
  },

  findById: (req: Request, res: Response) => {
    const ID_usuario = Number(req.params.ID_usuario);

    usuarioRepositorie.findById(ID_usuario, (err, usuario) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

      res.status(200).json(usuario[0]);
    });
  },

  findByEmail: (req: Request, res: Response) => {
    const { email } = req.body;

    usuarioRepositorie.findByEmail(email, (err, usuario) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar usuário" });
      if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

      res.status(200).json(usuario);
    });
  },

  update: (req: Request, res: Response) => {
    const ID_usuario = Number(req.params.ID_usuario);
    const { nome, telefone, email } = req.body;

    usuarioRepositorie.update(ID_usuario, nome, telefone, email, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor", details: err });

      res.status(200).json({ message: "Usuário atualizado com sucesso", result });
    });
  },

  delete: (req: Request, res: Response) => {
    const ID_usuario = Number(req.params.ID_usuario);

    usuarioRepositorie.delete(ID_usuario, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });

      res.status(200).json({ message: "Usuário deletado com sucesso", result });
    });
  },
};

export default usuarioController;
