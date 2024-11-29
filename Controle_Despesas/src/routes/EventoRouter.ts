import { Router } from 'express';
import EventoController from '../controller/EventoController'; // Certifique-se de que o caminho está correto

const router = Router();

// Rota para criar um novo evento
router.post('/eventos', EventoController.create);

// Rota para listar todos os eventos ou pesquisar por título
router.get('/eventos', EventoController.find);

// Rota para atualizar um evento existente
router.put('/eventos/:id', EventoController.update);

// Rota para remover um evento pelo ID
router.delete('/eventos', EventoController.delete);

export default router;
