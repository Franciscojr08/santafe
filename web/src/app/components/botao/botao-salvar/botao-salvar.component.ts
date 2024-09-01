import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-botao-salvar',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass
  ],
  templateUrl: './botao-salvar.component.html',
  styleUrl: './botao-salvar.component.css'
})
export class BotaoSalvarComponent {
  @Input() disabled: boolean = false;
  @Input() buttonClass: string = '';
  protected readonly faFloppyDisk = faFloppyDisk;
}
