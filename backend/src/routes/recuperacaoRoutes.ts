import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import usuarioRepositorie from '../repositories/usuarioRepositories';

export const resetPassword = async (req: Request, res: Response) => {
    const {token, newPassword} = req.body;

    try {
        const playload = jwt.verify(token, process.env.JWT_SECRET) as (ID_usuario: number);

        const handlePassword = await bcrypt.hash(newPassword, 10);
        await usuarioRepositorie.updatePassword(playload.ID_usuario, hashedPassword);

        return res.json({ message:'Senha atualizada com sucesso' });
    } catch (err) {
        return res.status(400).json({ error: 'Token inválido ou expirado'})
    }

    
}