export interface DadosDetalhamentoAluno {
  id: number,
  nome: string,
  clienteResponsavelId: number,
  turmaId: number,
  matricula?: string,
  rg?: string,
  cpf?: string,
  dataCadastro: string;
  dataAtualizacao?: string;
}
