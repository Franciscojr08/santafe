import {DadosListagemPedido} from "./dadosListagemPedido";
import {PageDadosListagem} from "../pageDadosListagem";

export interface PageDadosListagemPedido extends PageDadosListagem {
  content: DadosListagemPedido[];
}
