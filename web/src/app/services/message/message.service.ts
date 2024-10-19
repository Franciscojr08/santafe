import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string = '';
  type: number = 0;

  constructor() { }

  add(message: string, type: number, clear: boolean = true) {
    this.message = message;
    this.type = type;

    if (clear) {
      setTimeout(() => {
        this.clear();
      }, 4000);
    }
  }

  clear() {
    this.message = "";
    this.type = 0;
  }
}
