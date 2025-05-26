import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import usuarioRepositorie from "../repositories/usuarioRepositories";
import nodemailer from "nodemailer";

const loginController = { 

 login: (req: Request, res: Response) => {
  const { email, senha } = req.body;

  usuarioRepositorie.findByEmail(email, async (err, usuario) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });
    if (!usuario) return res.status(401).json({ error: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign(
      { id: usuario.ID_usuario },
      process.env.JWT_SECRET || "segredo123",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, usuario });
  });
},
}

export default loginController;



