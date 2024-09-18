import {DadosListagemSerie} from "./dadosListagemSerie";
import {PageDadosListagem} from "../pageDadosListagem";

export interface PageDadosListagemSerie extends PageDadosListagem {
  content: DadosListagemSerie[];
}
