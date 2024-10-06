import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDadosListagemAluno} from "../../interfaces/aluno/pageDadosListagemAluno";

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
}
