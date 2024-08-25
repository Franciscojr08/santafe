import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuNavComponent} from "./components/menu-nav/menu-nav.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web';
}
