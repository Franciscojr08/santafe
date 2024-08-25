import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-mensagem-erro',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './mensagem-erro.component.html',
  styleUrl: './mensagem-erro.component.css'
})
export class MensagemErroComponent {
  @Input() control!: FormControl
}
