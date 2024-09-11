import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PageDadosListagemSerie} from "../../interfaces/serie/pageDadosListagemSerie";
import {DadosFiltragemSerie} from "../../interfaces/serie/dadosFiltragemSerie";
import {DadosResponse} from "../../interfaces/dadosResponse";
import {DadosCadastroSerie} from "../../interfaces/serie/dadosCadastroSerie";
import {DadosDetalhamentoSerie} from "../../interfaces/serie/dadosDetalhamentoSerie";
import {DadosAtualizacaoSerie} from "../../interfaces/serie/dadosAtualizacaoSerie";

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

  detalhar(id: string): Observable<DadosDetalhamentoSerie> {
    return this.http.get<DadosDetalhamentoSerie>(`${this.API}/${id}`);
  }

  cadastrar(dadosCadastro: DadosCadastroSerie): Observable<DadosResponse> {
    return this.http.post<DadosResponse>(this.API,dadosCadastro).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(dadosAtualizacao: DadosAtualizacaoSerie): Observable<DadosResponse> {
    return this.http.put<DadosResponse>(this.API,dadosAtualizacao).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
