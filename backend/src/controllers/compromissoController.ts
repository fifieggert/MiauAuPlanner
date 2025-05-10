import { Request, Response } from "express";
import CompromissoRepositorie from "../repositories/compromissosRepositories";

/**
 * @swagger
 * /compromisso:
 *   post:
 *     summary: Cria um novo compromisso
 *     description: Endpoint para criar um novo compromisso no sistema
 *     tags:  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_compromissos:
 *                 type: string
 *               ID_animal:
 *                 type: number
 *               obrservacoes:
 *                 type: string
 *               ID_vacina:
 *                 type: number 
 *               ID_usuario:
 *                 type: number
 *               ID_veterinario:
 *                 type: number
 *               ID_clinica:
 *                 type: number
 */ 

const CompromissoController = {
    create: (req: Request, res: Response) => {
        const {data_compromissos, ID_animal, obrservacoes, ID_vacina} = req.body;
        CompromissoRepositorie.create(data_compromissos, ID_animal, obrservacoes, ID_vacina, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor"});
            res.status(201).json({ message: "Compromissos criado com sucesso", result})
        });
    },
    findAll: (req: Request, res: Response) => {
        CompromissoRepositorie.findAll((err, compromisso) => {
          if (err) {
            console.error("Erro no findAll:", err);
            return res.status(500).json({ error: "Erro no servidor" });
          }
          res.status(200).json(compromisso);
        });
    },
    findById: (req: Request, res: Response) => {
        const { ID_compromissos } = req.params;
        CompromissoRepositorie.findById((ID_compromissos), (err, compromisso) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          if (!compromisso) return res.status(404).json({ error: "Compromisso não encontrada" });
          res.status(200).json(compromisso);
        });
    },
    update: (req: Request, res: Response) => {
        const ID_compromissos = Number(req.params.ID_compromissos);
        const { data_compromissos, observacoes } = req.body;
        console.log("ID_compromissos recebido:", ID_compromissos);
        console.log("Dados recebidos:", { data_compromissos, ID_compromissos, observacoes });
    
        CompromissoRepositorie.update(ID_compromissos, data_compromissos, observacoes, (err, result) => {
          if (err) {
            console.error("Erro no update:", err);
            return res.status(500).json({ error: "Erro no servidor", details: err });
          }
          res.status(200).json({ message: "Compromisso atualizado com sucesso", result });
        });
    },
    delete: (req: Request, res: Response) => {
        const { ID_compromissos } = req.params;
        console.log(ID_compromissos, 'teste')
        CompromissoRepositorie.delete(ID_compromissos, (err, result) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json({ message: "Compromissos deletado com sucesso", result });
        });
    },
};

export default CompromissoController;