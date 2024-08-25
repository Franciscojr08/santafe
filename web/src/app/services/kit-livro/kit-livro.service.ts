import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {PageDadosListagemKitLivro} from "../../interfaces/kit-livro/pageDadosListagemKitLIvro";
import {DadosCadastroKitLivro} from "../../interfaces/kit-livro/dadosCadastroKitLivro";
import {DadosResponse} from "../../interfaces/dadosResponse";

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
}
