import { Component } from '@angular/core';
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {
  FiltroLivroKitLivroComponent
} from "../../components/filtros/filtro-livro-kit-livro/filtro-livro-kit-livro.component";
import {BotoesComponent} from "../../components/filtros/botoes/botoes.component";
import {KitLivroService} from "../../services/kit-livro/kit-livro.service";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {LISTAGEM_KIT_LIVRO} from "../../const/kit-livro/const-kit-livro";
import {TotalRegistrosComponent} from "../../components/total-registros/total-registros.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {faFilter, faHome, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {RouterLink} from "@angular/router";
import {MessagesComponent} from "../../components/messages/messages.component";


@Component({
  selector: 'app-kit-livro',
  standalone: true,
  imports: [
    MenuNavComponent,
    BreadcrumbComponent,
    ConteudoComponent,
    FieldsetComponent,
    FiltroLivroKitLivroComponent,
    BotoesComponent,
    TabelaGenericaComponent,
    TotalRegistrosComponent,
    FooterComponent,
    FaIconComponent,
    BotaoCadastrarComponent,
    RouterLink,
    MessagesComponent,
  ],
  templateUrl: './kit-livro.component.html',
  styleUrl: './kit-livro.component.css'
})
export class KitLivroComponent {
  faPlus = faPlus;
  displayedColumns: string[] = ['id', 'nome', 'valor', 'quantidadeDisponivel', 'quantidadePedidos', 'quantidadePendencias', 'dataCadastro', 'dataAtualizacao'];
  dataSource: any[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private kitLivroService: KitLivroService) {
    this.listar();
  }

  listar(pageIndex = 0, pageSize = 10) {
    this.kitLivroService.listar(pageIndex, pageSize).subscribe(response => {
      this.dataSource = response.content;
      this.totalElements = response.totalElements;
      this.pageSize = response.size;
      this.pageIndex = response.number;
    });
  }

  onPageChange(event: any) {
    this.listar(event.pageIndex, event.pageSize);
  }

  protected readonly LISTAGEM_KIT_LIVRO = LISTAGEM_KIT_LIVRO;
  protected readonly faHome = faHome;
  protected readonly faFilter = faFilter;
}
