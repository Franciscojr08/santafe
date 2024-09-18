import {DadosListagemAluno} from "./dadosListagemAluno";
import {PageDadosListagem} from "../pageDadosListagem";

export interface PageDadosListagemAluno extends PageDadosListagem {
  content: DadosListagemAluno[];
}
