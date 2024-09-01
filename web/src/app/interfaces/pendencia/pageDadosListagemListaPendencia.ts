import {DadosListagemListaPendencia} from "./dadosListagemListaPendencia";

export interface PageDadosListagemListaPendencia {
  totalPages: number;
  totalElements: number;
  size: number;
  content: DadosListagemListaPendencia[];
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
