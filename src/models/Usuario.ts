import type Pedido from "./Pedido";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  pedido?: Pedido[] | null;
}
