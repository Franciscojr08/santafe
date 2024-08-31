import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {PageDadosListagemKitLivro} from "../../interfaces/kit-livro/pageDadosListagemKitLIvro";
import {DadosCadastroKitLivro} from "../../interfaces/kit-livro/dadosCadastroKitLivro";
import {DadosResponse} from "../../interfaces/dadosResponse";
import {DadosFiltragemKitLivro} from "../../interfaces/kit-livro/dadosFiltragemKitLivro";

@Injectable({
  providedIn: 'root'
})
export class KitLivroService {
  private API = 'http://localhost:8080/kitLivro';

  constructor(private http: HttpClient) {}

  listar(page: number, size: number): Observable<PageDadosListagemKitLivro> {
    return this.http.get<PageDadosListagemKitLivro>(`${this.API}?page=${page}&size=${size}`);
  }

  cadastrar(dadosCadastro: DadosCadastroKitLivro): Observable<DadosResponse> {
    return this.http.post<DadosResponse>(this.API,dadosCadastro).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  filtrar(page: number, size: number, filtros: DadosFiltragemKitLivro): Observable<PageDadosListagemKitLivro> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    Object.keys(filtros).forEach(key => {
      const value = filtros[key as keyof DadosFiltragemKitLivro];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PageDadosListagemKitLivro>(`${this.API}/filtrar`, { params });
  }
}
