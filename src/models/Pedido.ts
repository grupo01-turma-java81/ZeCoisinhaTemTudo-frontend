import type Cliente from "./Cliente";
import type Usuario from "./Usuario";

export default interface Pedido {
  id: number;
  dataPedido: string;
  statusEntrega: string;
  valorTotal: number;
  positivo: boolean;
  cliente: Cliente | null;
  usuario: Usuario | null;
}
