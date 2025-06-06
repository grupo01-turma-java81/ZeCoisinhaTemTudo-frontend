import type Pedido from "./Pedido";

export default interface Cliente {
  cpf: number;
  nome: string;
  telefone: string;
  endereco: string;
  dataCadastro: string;
  pedido?: Pedido[] | null;
}
