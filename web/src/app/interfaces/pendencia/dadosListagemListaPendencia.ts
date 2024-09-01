export interface DadosListagemListaPendencia {
  id: number;
  pedidoId: number;
  nomeCliente: string;
  quantidadeLivros: number;
  quantidadeLivrosEntregues: number;
  quantidadeKitLivros: number;
  quantidadeKitLivrosEntregues: number;
  situacao: string;
  dataCadastro: string;
  dataEntrega?: string;
}
