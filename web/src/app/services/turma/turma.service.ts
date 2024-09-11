import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDadosListagemTurma} from "../../interfaces/turma/pageDadosListagemTurma";

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private API = 'http://localhost:8080/turma';

  constructor(private http: HttpClient) {}

  listar(page: number, size: number): Observable<PageDadosListagemTurma> {
    return this.http.get<PageDadosListagemTurma>(`${this.API}?page=${page}&size=${size}`);
  }

  public listarPorSerie(serieId: number, page: number, size: number): Observable<PageDadosListagemTurma> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageDadosListagemTurma>(`${this.API}/listar-por-serie/${serieId}`,{ params });
  }
}
