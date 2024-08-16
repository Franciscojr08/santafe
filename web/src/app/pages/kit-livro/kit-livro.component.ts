import { Component } from '@angular/core';
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-kit-livro',
  standalone: true,
  imports: [
    MenuNavComponent,
    BreadcrumbComponent
  ],
  templateUrl: './kit-livro.component.html',
  styleUrl: './kit-livro.component.css'
})
export class KitLivroComponent {

}
