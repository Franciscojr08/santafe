import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DadosEndereco} from "../../interfaces/endereco/dadosEndereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private API = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}

  public consultarCEP(cep:string): Observable<DadosEndereco> {
    return this.http.get<DadosEndereco>(`${this.API}/${cep}/json`);
  }
}
