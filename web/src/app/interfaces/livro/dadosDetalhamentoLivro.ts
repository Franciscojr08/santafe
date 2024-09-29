export interface DadosDetalhamentoLivro {
  id: number;
  identificador: string;
  nome: string;
  usoInterno: boolean;
  serieId: number;
  valor: number;
  quantidadeDisponivel: number;
  dataCadastro: string;
  dataAtualizacao?: string;
}
