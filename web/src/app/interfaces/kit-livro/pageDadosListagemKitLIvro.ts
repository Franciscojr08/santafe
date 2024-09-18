import {DadosListagemKitLivro} from "./dadosListagemKitLivro";
import {PageDadosListagem} from "../pageDadosListagem";

export interface PageDadosListagemKitLivro extends PageDadosListagem{
  content: DadosListagemKitLivro[];
}
