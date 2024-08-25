import { Component } from '@angular/core';
import {faBroom, faFilter, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-botoes',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './botoes.component.html',
  styleUrl: './botoes.component.css'
})
export class BotoesComponent {

  faFilter = faFilter;
  faBroom = faBroom;
  faPlus = faPlus;
}
