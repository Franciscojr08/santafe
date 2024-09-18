import {DadosListagemLivro} from "./dadosListagemLivro";
import {PageDadosListagem} from "../pageDadosListagem";

export interface PageDadosListagemLivro extends PageDadosListagem{
  content: DadosListagemLivro[];
}
