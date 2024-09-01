import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-botao-voltar',
  standalone: true,
	imports: [
		FaIconComponent
	],
  templateUrl: './botao-voltar.component.html',
  styleUrl: './botao-voltar.component.css'
})
export class BotaoVoltarComponent {
  protected readonly faAnglesLeft = faAnglesLeft;
}
