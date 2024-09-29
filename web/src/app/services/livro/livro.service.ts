import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PageDadosListagemLivro} from "../../interfaces/livro/pageDadosListagemLivro";
import {DadosFiltragemSerie} from "../../interfaces/serie/dadosFiltragemSerie";
import {DadosCadastroLivro} from "../../interfaces/livro/dadosCadastroLivro";
import {DadosResponse} from "../../interfaces/dadosResponse";
import {DadosDetalhamentoLivro} from "../../interfaces/livro/dadosDetalhamentoLivro";
import {DadosAtualizacaoLivro} from "../../interfaces/livro/dadosAtualizacaoLivro";

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private API = 'http://localhost:8080/livro';

  constructor(private http: HttpClient) {}

  public listarPorSerie(serieId: number, page: number, size: number): Observable<PageDadosListagemLivro> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageDadosListagemLivro>(`${this.API}/listar-por-serie/${serieId}`,{ params });
  }

  public listar(page: number, size: number): Observable<PageDadosListagemLivro> {
    return this.http.get<PageDadosListagemLivro>(`${this.API}?page=${page}&size=${size}`);
  }

  filtrar(page: number, size: number, filtros: DadosFiltragemSerie): Observable<PageDadosListagemLivro> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    Object.keys(filtros).forEach(key => {
      const value = filtros[key as keyof DadosFiltragemSerie];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PageDadosListagemLivro>(`${this.API}/filtrar`, { params });
  }

  public cadastrar(dadosCadastro: DadosCadastroLivro): Observable<DadosResponse> {
    return this.http.post<DadosResponse>(this.API,dadosCadastro).pipe(
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

  detalhar(id: string): Observable<DadosDetalhamentoLivro> {
    return this.http.get<DadosDetalhamentoLivro>(`${this.API}/${id}`);
  }

  atualizar(dadosAtualizacao: DadosAtualizacaoLivro): Observable<DadosResponse> {
    return this.http.put<DadosResponse>(this.API,dadosAtualizacao).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
