import {DadosCadastroEndereco} from "../endereco/dadosCadastroEndereco";

export interface DadosAtualizacaoCliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  responsavelAluno: boolean;
  endereco: DadosCadastroEndereco
}
