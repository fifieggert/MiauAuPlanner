import { Request, Response } from "express";
import HistoricoRepositorie from "../repositories/historicoRepositories";

const HistoricoController = {
    create: (req: Request, res: Response) => {
        const {data_historico, ID_animal, obrservacoes} = req.body;
        HistoricoRepositorie.create(data_historico, ID_animal, obrservacoes, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor"});
            res.status(201).json({ message: "Historico criado com sucesso", result})
        });
    },
    findAll: (req: Request, res: Response) => {
        HistoricoRepositorie.findAll((err, historico) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json(historico);
        });
      },
      findById: (req: Request, res: Response) => {
        const { ID_historico } = req.params;
        HistoricoRepositorie.findById((ID_historico), (err, historico) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          if (!historico) return res.status(404).json({ error: "Historico não encontrada" });
          res.status(200).json(historico);
        });
      },
      update: (req: Request, res: Response) => {
        const ID_historico = Number(req.params.ID_historico);
        const { data_historico, observacoes } = req.body;
        console.log("ID_historico recebido:", ID_historico);
        console.log("Dados recebidos:", { data_historico, ID_historico, observacoes });
    
        HistoricoRepositorie.update(ID_historico, data_historico, observacoes, (err, result) => {
          if (err) {
            console.error("Erro no update:", err);
            return res.status(500).json({ error: "Erro no servidor", details: err });
          }
          res.status(200).json({ message: "Vacina atualizado com sucesso", result });
        });
      },
    
      delete: (req: Request, res: Response) => {
        const { ID_historico } = req.params;
        console.log(ID_historico, 'teste')
        HistoricoRepositorie.delete(ID_historico, (err, result) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json({ message: "Historico deletado com sucesso", result });
        });
      },
    };
    
    export default HistoricoController;