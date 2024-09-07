import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faTrashArrowUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-botao-deletar',
  standalone: true,
	imports: [
		FaIconComponent
	],
  templateUrl: './botao-deletar.component.html',
  styleUrl: './botao-deletar.component.css'
})
export class BotaoDeletarComponent {

  protected readonly faTrashArrowUp = faTrashArrowUp;
}
