import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {BotoesComponent} from "../../components/filtros/botoes/botoes.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {
	FiltroLivroKitLivroComponent
} from "../../components/filtros/filtro-livro-kit-livro/filtro-livro-kit-livro.component";

@Component({
  selector: 'app-livro',
  standalone: true,
	imports: [
		BreadcrumbComponent,
		MenuNavComponent,
		BotoesComponent,
		ConteudoComponent,
		FieldsetComponent,
		FiltroLivroKitLivroComponent
	],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {

}
