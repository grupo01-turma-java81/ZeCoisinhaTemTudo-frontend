import type Cliente from "./Cliente";
import type Usuario from "./Usuario";

export default interface Pedido {
  id: number;
  dataPedido: string;
  statusEntrega: string;
  valorTotal: number;
  positivo: boolean;
  comentario: string;
  nota: number;
  cliente: Cliente | null;
  usuario: Usuario | null;
}
