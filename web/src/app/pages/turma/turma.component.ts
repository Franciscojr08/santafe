import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";

@Component({
  selector: 'app-turma',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent
  ],
  templateUrl: './turma.component.html',
  styleUrl: './turma.component.css'
})
export class TurmaComponent {

}
