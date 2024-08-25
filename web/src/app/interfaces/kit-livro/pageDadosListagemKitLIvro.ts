import {DadosListagemKitLivro} from "./dadosListagemKitLivro";

export interface PageDadosListagemKitLivro {
  totalPages: number;             // Total de páginas disponíveis
  totalElements: number;          // Total de elementos
  size: number;                   // Tamanho da página (quantidade de itens por página)
  content: DadosListagemKitLivro[];  // Conteúdo da página (lista de kits de livros)
  number: number;                 // Número da página atual
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;                 // Se é a primeira página
  last: boolean;                  // Se é a última página
  numberOfElements: number;       // Número de elementos na página atual
  empty: boolean;                 // Se a página está vazia
}
