export interface DadosResponse {
  dataHora: string;
  tipo: string;
  status: number;
  mensagem: string;
  dados: Array<{
    campo: string;
    mensagem: string;
  }>;
}
