export interface DadosListagemPedido {
  id: number;
  dataPedido: string;
  nomeCliente: string;
  valor: number;
  desconto: number;
  valorTotal: number;
  quantidadeLivros: number;
  quantidadeKitLivros: number;
  pendencia: string;
  formaPagamento: string;
  situacao: string;
}
