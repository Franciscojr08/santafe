import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";

@Component({
  selector: 'app-pedido',
  standalone: true,
	imports: [
		BreadcrumbComponent,
		MenuNavComponent
	],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {

}
