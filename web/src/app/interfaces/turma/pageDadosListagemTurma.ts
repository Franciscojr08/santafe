import {DadosListagemTurma} from "./dadosListagemTurma";
import {PageDadosListagem} from "../pageDadosListagem";

export interface PageDadosListagemTurma extends PageDadosListagem {
  content: DadosListagemTurma[];
}
