export interface DadosAtualizacaoAluno {
  id: number,
  nome: string,
  clienteResponsavelId: number,
  turmaId: number,
  matricula?: string,
  rg?: string,
  cpf?: string,
}
