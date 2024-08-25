import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {faBan} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-botao-cancelar',
  standalone: true,
	imports: [
		FaIconComponent,
		RouterLink
	],
  templateUrl: './botao-cancelar.component.html',
  styleUrl: './botao-cancelar.component.css'
})
export class BotaoCancelarComponent {
  protected readonly faBan = faBan;
}
