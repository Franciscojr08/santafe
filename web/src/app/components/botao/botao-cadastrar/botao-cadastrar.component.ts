import {Component, Input} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-botao-cadastrar',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './botao-cadastrar.component.html',
  styleUrl: './botao-cadastrar.component.css'
})
export class BotaoCadastrarComponent {
	protected readonly faPlus = faPlus;
  @Input() link: string = '';
}
