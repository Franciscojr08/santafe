import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PageDadosListagemAluno} from "../../interfaces/aluno/pageDadosListagemAluno";
import {DadosFiltragemAluno} from "../../interfaces/aluno/dadosFiltragemAluno";
import {DadosResponse} from "../../interfaces/dadosResponse";
import {DadosCadastroAluno} from "../../interfaces/aluno/dadosCadastroAluno";
import {DadosDetalhamentoAluno} from "../../interfaces/aluno/dadosDetalhamentoAluno";
import {DadosAtualizacaoAluno} from "../../interfaces/aluno/dadosAtualizacaoAluno";

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private API = 'http://localhost:8080/aluno';

  constructor(private http: HttpClient) {}

  listarPorTurma(turmaId: number, page: number, size: number): Observable<PageDadosListagemAluno> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageDadosListagemAluno>(`${this.API}/listar-por-turma/${turmaId}`,{ params });
  }

  listarPorCliente(clienteId: number, page: number, size: number): Observable<PageDadosListagemAluno> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageDadosListagemAluno>(`${this.API}/listar-por-cliente/${clienteId}`,{ params });
  }

  listar(page: number, size: number): Observable<PageDadosListagemAluno> {
    return this.http.get<PageDadosListagemAluno>(`${this.API}?page=${page}&size=${size}`)
  }

  filtrar(page: number, size: number, filtros: DadosFiltragemAluno): Observable<PageDadosListagemAluno> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    Object.keys(filtros).forEach(key => {
      const value = filtros[key as keyof DadosFiltragemAluno];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PageDadosListagemAluno>(`${this.API}/filtrar`, { params });
  }

  cadastrar(dadosCadastro: DadosCadastroAluno): Observable<DadosResponse> {
    return this.http.post<DadosResponse>(this.API,dadosCadastro).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  detalhar(id: string): Observable<DadosDetalhamentoAluno> {
    return this.http.get<DadosDetalhamentoAluno>(`${this.API}/${id}`);
  }

  atualizar(dadosAtualizacao: DadosAtualizacaoAluno): Observable<DadosResponse> {
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
}
