import { Component } from '@angular/core';
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {ModalCancelarComponent} from "../../components/modal-cancelar/modal-cancelar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuNavComponent,
    ModalCancelarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
