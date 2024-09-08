import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDadosListagemSerie} from "../../interfaces/serie/pageDadosListagemSerie";
import {DadosFiltragemSerie} from "../../interfaces/serie/dadosFiltragemSerie";

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private API = 'http://localhost:8080/serie';

  constructor(private http: HttpClient) {}

  listar(page: number, size: number): Observable<PageDadosListagemSerie> {
    return this.http.get<PageDadosListagemSerie>(`${this.API}?page=${page}&size=${size}`);
  }

  filtrar(page: number, size: number, filtros: DadosFiltragemSerie): Observable<PageDadosListagemSerie> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    Object.keys(filtros).forEach(key => {
      const value = filtros[key as keyof DadosFiltragemSerie];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PageDadosListagemSerie>(`${this.API}/filtrar`, { params });
  }
}
