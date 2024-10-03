import {PageDadosListagem} from "../pageDadosListagem";
import {DadosListagemCliente} from "./dadosListagemCliente";


export interface PageDadosListagemCliente extends PageDadosListagem {
  content: DadosListagemCliente[];
}
