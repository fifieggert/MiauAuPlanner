import { Request, Response } from "express";
import VacinasAplicadasRepositorie from "../repositories/vacinasAplicadasRepositories";

const vacinaAplicadasController = {
    create: (req: Request, res: Response) => {
        const {ID_catalogo, dose, data_aplicacao} = req.body;
        VacinasAplicadasRepositorie.create(ID_catalogo, dose, data_aplicacao, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro no servidor"});
            res.status(201).json({ message: "Vacina criada com sucesso", result})
        });
    },
    findAll: (req: Request, res: Response) => {
        VacinasAplicadasRepositorie.findAll((err, vacina) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json(vacina);
        });
      },
      findById: (req: Request, res: Response) => {
        const { ID_vacina } = req.params;
        VacinasAplicadasRepositorie.findById((ID_vacina), (err, vacina) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          if (!vacina) return res.status(404).json({ error: "Historico não encontrado" });
          res.status(200).json(vacina);
        });
      },
      update: (req: Request, res: Response) => {
        const ID_vacina = (req.params.ID_vacina);
        const { dose, data_aplicacao } = req.body;
        console.log("ID_historico recebido:", ID_vacina);
        console.log("Dados recebidos:", { dose, data_aplicacao, ID_vacina });
    
        VacinasAplicadasRepositorie.update(dose, data_aplicacao, ID_vacina, (err, result) => {
          if (err) {
            console.error("Erro no update:", err);
            return res.status(500).json({ error: "Erro no servidor", details: err });
          }
          res.status(200).json({ message: "Vacina atualizada com sucesso", result });
        });
      },
    
      delete: (req: Request, res: Response) => {
        const { ID_vacina } = req.params;
        console.log(ID_vacina, 'teste')
        VacinasAplicadasRepositorie.delete(ID_vacina, (err, result) => {
          if (err) return res.status(500).json({ error: "Erro no servidor" });
          res.status(200).json({ message: "Historico deletado com sucesso", result });
        });
      },
    };
    
    export default vacinaAplicadasController;