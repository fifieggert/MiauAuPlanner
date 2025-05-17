import { Request, Response } from "express";
import usuarioRepositorie from "../repositories/usuarioRepositories";
import bcrypt from "bcrypt"; // ✅ importe no topo

const usuarioController = {
  create: (req: Request, res: Response) => {
    const { nome, telefone, email, cpf, senha } = req.body;

    // Criptografar a senha
  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Erro ao criptografar senha" });

    usuarioRepositorie.create(nome, telefone, cpf, email, hash, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(201).json({ message: "Usuário criado com sucesso", result });
    });
  });
},

  findAll: (req: Request, res: Response) => {
    usuarioRepositorie.findAll((err, usuario) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json(usuario);
    });
  },

  findById: (req: Request, res: Response) => {
    const { ID_usuario } = req.params;
    usuarioRepositorie.findById((ID_usuario), (err, usuario) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
      res.status(200).json(usuario);
    });
  },

  update: (req: Request, res: Response) => {
    const ID_usuario = Number(req.params.ID_usuario);
    const { nome, telefone, email, cpf } = req.body;
    console.log("ID_usuario recebido:", ID_usuario);
    console.log("Dados recebidos:", { nome, telefone, email, cpf });

    usuarioRepositorie.update(ID_usuario, nome, telefone, email, (err, result) => {
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
    usuarioRepositorie.delete(ID_usuario, (err, result) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      res.status(200).json({ message: "Usuário deletado com sucesso", result });
    });
  },
};

export default usuarioController;
