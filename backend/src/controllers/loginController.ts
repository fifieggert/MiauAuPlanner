import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import usuarioRepositorie from "../repositories/usuarioRepositories";
import nodemailer from 'nodemailer';
import auth from "../constants/auth"; 

export const frogotPassword = async (req: Request, res: Response) => {
    const {email} = req.body;

    const user = await usuarioRepositorie.findByEmail(email);
    if (!usuario) return res.status(404).json ({ error: "Usuário não encontrado"});

    const token = jwt.sign({ ID_usuario: ID_usuario}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
     
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport ({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transporter.sendMail ({
        to: email,
        subject: 'Recuperação de senha',
        html: `<p> Clique no link para redefinir sua senha: <p>< a href="${resetLink}">${resetLink}<a>`,
    });

    return res.json({ message: 'Email de resuperação enviado!'});
};

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
