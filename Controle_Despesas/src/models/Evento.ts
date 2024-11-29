import mongoose, { Schema, Document } from 'mongoose';

// Defina a interface para garantir tipagem no TypeScript
interface IEvento extends Document {
  titulo: string;
  descricao?: string;
  data: Date;
  local: string;
  valor: number;
}

// Crie o esquema com base na interface
const eventoSchema = new Schema<IEvento>({
  titulo: {
    type: String,
    required: [true, 'O título do evento é obrigatório.'],
  },
  descricao: {
    type: String, // Campo opcional
  },
  data: {
    type: Date,
    required: [true, 'A data do evento é obrigatória.'],
  },
  local: {
    type: String,
    required: [true, 'O local do evento é obrigatório.'],
  },
  valor: {
    type: Number,
    required: [true, 'O valor do evento é obrigatório.'],
  },
});

// Crie o modelo com base no esquema
const Evento = mongoose.model<IEvento>('Evento', eventoSchema);

export { Evento, IEvento };
