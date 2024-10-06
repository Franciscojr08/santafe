import {DadosCadastroEndereco} from "../endereco/dadosCadastroEndereco";

export interface DadosCadastroCliente {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  responsavelAluno: boolean;
  endereco: DadosCadastroEndereco
}
