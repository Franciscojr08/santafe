import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";

@Component({
  selector: 'app-cliente',
  standalone: true,
	imports: [
		BreadcrumbComponent,
		MenuNavComponent
	],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

}
