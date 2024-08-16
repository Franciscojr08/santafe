import { Component } from '@angular/core';
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuNavComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
