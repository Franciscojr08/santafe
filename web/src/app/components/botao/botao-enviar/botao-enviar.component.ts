import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-botao-enviar',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './botao-enviar.component.html',
  styleUrl: './botao-enviar.component.css'
})
export class BotaoEnviarComponent {
  @Input() disabled: boolean = false;
  @Input() buttonClass: string = '';
  protected readonly faPaperPlane = faPaperPlane;
}
