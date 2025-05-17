import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import usuarioRepositorie from "../repositories/usuarioRepositories";
import auth from "../constants/auth"; // ou constants/auth.ts

const loginController = {
    login: (req: Request, res: Response) => {
        const { email, senha } = req.body;

        usuarioRepositorie.findByEmail(email, (err, usuario) => {
            if (err) return res.status(500).json({ error: "Erro no servidor" });
            if (!usuario) return res.status(401).json({ error: "Usuário não encontrado" });

            // Comparar senha
            bcrypt.compare(senha, usuario.senha, (err, same) => {
                if (err) return res.status(500).json({ error: "Erro ao verificar senha" });
                if (!same) return res.status(401).json({ error: "Senha inválida" });

                // Gerar token
                const token = jwt.sign(
                    { id: usuario.ID_usuario },        // payload
                    process.env.JWT_SECRET || "segredo123", // secret
                    { expiresIn: "1h" }             // opções
                );


                return res.status(200).json({ token, usuario });
            });
        });
    }
};

export default loginController;
