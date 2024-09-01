export interface DadosDetalhamentoKitLivro {
  id: number;
  nome: string;
  descricao?: string;
  valor: number;
  quantidadeDisponivel: number;
  dataCadastro: string;
  dataAtualizacao?: string;
}
