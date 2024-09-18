import {DadosListagemListaPendencia} from "./dadosListagemListaPendencia";
import {PageDadosListagem} from "../pageDadosListagem";

export interface PageDadosListagemListaPendencia extends PageDadosListagem {
  content: DadosListagemListaPendencia[];
}
