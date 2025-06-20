import type Pedido from "./Pedido";

export default interface Cliente {
  id: number;
  cpf: string;
  nome: string;
  telefone: string;
  endereco: string;
  dataCadastro?: string;
  pedido?: Pedido[] | null;
}
