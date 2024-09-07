import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {DadosExclusao} from "../../interfaces/dadosExclusao";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private deleteConfirmedSubject = new Subject<DadosExclusao>();
  deleteConfirmed$ = this.deleteConfirmedSubject.asObservable();

  confirmDelete(dadosExclusao: DadosExclusao) {
    this.deleteConfirmedSubject.next(dadosExclusao);
  }
}
