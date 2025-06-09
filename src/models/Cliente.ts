import type Pedido from "./Pedido";

export default interface Cliente {
  cpf: string; // Alterado para string
  nome: string;
  telefone: string;
  endereco: string;
  dataCadastro?: string; // Opcional, preenchido pelo backend
  pedido?: Pedido[] | null;
}