import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";

@Component({
  selector: 'app-livro',
  standalone: true,
	imports: [
		BreadcrumbComponent,
		MenuNavComponent,
		ConteudoComponent,
		FieldsetComponent
	],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {

}
