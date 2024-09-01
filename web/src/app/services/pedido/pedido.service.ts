import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDadosListagemPedido} from "../../interfaces/pedido/pageDadosListagemPedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private API = 'http://localhost:8080/pedido';

  constructor(private http: HttpClient) {}

  listarPorKitLivro(kitLivroId: number, page: number, size: number): Observable<PageDadosListagemPedido> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageDadosListagemPedido>(`${this.API}/listar-por-kit/${kitLivroId}`,{ params });
  }
}
