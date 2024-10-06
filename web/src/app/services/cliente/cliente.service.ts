import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PageDadosListagemCliente} from "../../interfaces/cliente/pageDadosListagemCliente";
import {DadosFiltragemCliente} from "../../interfaces/cliente/dadosFiltragemCliente";
import {DadosFiltragemSerie} from "../../interfaces/serie/dadosFiltragemSerie";
import {DadosResponse} from "../../interfaces/dadosResponse";
import {DadosCadastroCliente} from "../../interfaces/cliente/dadosCadastroCliente";

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

  cadastrar(dadosCadastro: DadosCadastroCliente): Observable<DadosResponse> {
    return this.http.post<DadosResponse>(this.API,dadosCadastro).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
