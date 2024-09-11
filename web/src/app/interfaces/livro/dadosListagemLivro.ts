export interface DadosListagemLivro {
  id: number;
  identificador: string;
  nome: string;
  usoInterno: string;
  serieNome: string;
  valor: number;
  quantidadeDisponivel: number;
  quantidadePedidos: number;
  quantidadePendencias: number;
  dataCadastro: string;
  dataAtualizacao?: string;
}
