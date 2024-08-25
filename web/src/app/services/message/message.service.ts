import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string = '';
  type: number = 0;

  constructor() { }

  add(message: string, type: number) {
    this.message = message;
    this.type = type;

    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.message = "";
    this.type = 0;
  }
}
