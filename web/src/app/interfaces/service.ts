import {Observable} from "rxjs";
import {DadosResponse} from "./dadosResponse";

export interface Service {
  deletar(id: number): Observable<DadosResponse>;
}
