import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";

@Component({
  selector: 'app-pendencia',
  standalone: true,
	imports: [
		BreadcrumbComponent,
		MenuNavComponent
	],
  templateUrl: './pendencia.component.html',
  styleUrl: './pendencia.component.css'
})
export class PendenciaComponent {

}
