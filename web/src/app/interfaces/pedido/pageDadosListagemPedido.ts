import {DadosListagemPedido} from "./dadosListagemPedido";

export interface PageDadosListagemPedido {
  totalPages: number;
  totalElements: number;
  size: number;
  content: DadosListagemPedido[];
  number: number;
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
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
