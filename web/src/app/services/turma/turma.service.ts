import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PageDadosListagemTurma} from "../../interfaces/turma/pageDadosListagemTurma";
import {DadosFiltragemTurma} from "../../interfaces/turma/dadosFiltragemTurma";
import {DadosCadastroTurma} from "../../interfaces/turma/dadosCadastroTurma";
import {DadosResponse} from "../../interfaces/dadosResponse";
import {DadosDetalhamentoTurma} from "../../interfaces/turma/dadosDetalhamentoTurma";
import {DadosAtualizacaoTurma} from "../../interfaces/turma/dadosAtualizacaoTurma";
import {DadosCombo} from "../../interfaces/dadosCombo";

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

  public filtrar(page: number, size: number, filtros: DadosFiltragemTurma): Observable<PageDadosListagemTurma> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    Object.keys(filtros).forEach(key => {
      const value = filtros[key as keyof DadosFiltragemTurma];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    console.log(params)
    return this.http.get<PageDadosListagemTurma>(`${this.API}/filtrar`, { params });
  }

  public detalhar(id: string): Observable<DadosDetalhamentoTurma> {
    return this.http.get<DadosDetalhamentoTurma>(`${this.API}/${id}`)
  }

  public cadastrar(dadosCadastro: DadosCadastroTurma): Observable<DadosResponse> {
    return this.http.post<DadosResponse>(this.API,dadosCadastro).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public atualizar(dadosAtualizacao: DadosAtualizacaoTurma): Observable<DadosResponse> {
    return this.http.put<DadosResponse>(this.API,dadosAtualizacao).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  deletar(id: number): Observable<DadosResponse> {
    return this.http.delete<DadosResponse>(`${this.API}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  combo(): Observable<DadosCombo[]> {
    return this.http.get<DadosCombo[]>(`${this.API}/combo`);
  }
}
