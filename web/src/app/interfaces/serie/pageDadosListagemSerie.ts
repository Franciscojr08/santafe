import {DadosListagemSerie} from "./dadosListagemSerie";

export interface PageDadosListagemSerie {
  totalPages: number;
  totalElements: number;
  size: number;
  content: DadosListagemSerie[];
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
