import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDadosListagemCliente} from "../../interfaces/cliente/pageDadosListagemCliente";
import {DadosFiltragemCliente} from "../../interfaces/cliente/dadosFiltragemCliente";
import {DadosFiltragemSerie} from "../../interfaces/serie/dadosFiltragemSerie";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private API = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) {}

  public listar(page: number, size: number): Observable<PageDadosListagemCliente> {
    return this.http.get<PageDadosListagemCliente>(`${this.API}?page=${page}&size=${size}`)
  }

  filtrar(page: number, size: number, filtros: DadosFiltragemCliente): Observable<PageDadosListagemCliente> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    Object.keys(filtros).forEach(key => {
      const value = filtros[key as keyof DadosFiltragemSerie];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PageDadosListagemCliente>(`${this.API}/filtrar`, { params });
  }
}
