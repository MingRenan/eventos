import { Request, Response } from 'express';
import { Evento } from '../models/Evento'; // Certifique-se de que o caminho está correto

class EventosController {
  // Criar um novo evento
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descricao, data, local, valor } = req.body;
      const evento = new Evento({ titulo, descricao, data, local, valor });
      await evento.save();
      res.status(201).json(evento);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar evento', error });
    }
  }

  // Listar todos os eventos ou pesquisar por título
  async find(req: Request, res: Response): Promise<void> {
    try {
      const { titulo } = req.query;

      // Filtra eventos pelo título caso o parâmetro seja fornecido
      const filter = titulo ? { titulo: { $regex: titulo, $options: 'i' } } : {};

      const eventos = await Evento.find(filter);
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar eventos', error });
    }
  }

  // Atualizar informações de um evento
  async update(req: Request, res: Response): Promise<any> {
    try {
      const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!evento) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      res.json(evento);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar evento', error });
    }
  }

  // Excluir um evento
  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.body; // Pegando o ID do body
  
      if (!id) {
        return res.status(400).json({ message: "O ID do evento é obrigatório." });
      }
  
      const evento = await Evento.findByIdAndDelete(id);
  
      if (!evento) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }
  
      res.json({ message: "Evento excluído com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir evento.", error });
    }
  }
}

export default new EventosController();
