import {DadosCadastroEndereco} from "../endereco/dadosCadastroEndereco";

export interface DadosDetalhamentoCliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  responsavelAluno: boolean;
  endereco: DadosCadastroEndereco
  dataCadastro: string;
  dataAtualizacao?: string;
}
