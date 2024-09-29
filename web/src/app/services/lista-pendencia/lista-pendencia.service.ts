import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDadosListagemListaPendencia} from "../../interfaces/pendencia/pageDadosListagemListaPendencia";

@Injectable({
  providedIn: 'root'
})
export class ListaPendenciaService {
  private API = 'http://localhost:8080/lista-pendencia';

  constructor(private http: HttpClient) {}

  listarPorKitLivro(kitLivroId: number, page: number, size: number): Observable<PageDadosListagemListaPendencia> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageDadosListagemListaPendencia>(`${this.API}/listar-por-kit/${kitLivroId}`,{ params });
  }

  listarPorLivro(livroId: number, page: number, size: number): Observable<PageDadosListagemListaPendencia> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageDadosListagemListaPendencia>(`${this.API}/listar-por-livro/${livroId}`,{ params });
  }
}
