import {Component} from '@angular/core';
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {KitLivroService} from "../../services/kit-livro/kit-livro.service";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {LISTAGEM_KIT_LIVRO} from "../../const/kit-livro/const-kit-livro";
import {TotalRegistrosComponent} from "../../components/total-registros/total-registros.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {faBroom, faFilter, faHome, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {RouterLink} from "@angular/router";
import {MessagesComponent} from "../../components/messages/messages.component";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-kit-livro',
  standalone: true,
  imports: [
    MenuNavComponent,
    BreadcrumbComponent,
    ConteudoComponent,
    FieldsetComponent,
    TabelaGenericaComponent,
    TotalRegistrosComponent,
    FooterComponent,
    FaIconComponent,
    BotaoCadastrarComponent,
    RouterLink,
    MessagesComponent,
    CurrencyMaskModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './kit-livro.component.html',
  styleUrl: './kit-livro.component.css'
})
export class KitLivroComponent {
  protected readonly LISTAGEM_KIT_LIVRO = LISTAGEM_KIT_LIVRO;
  protected readonly faHome = faHome;
  protected readonly faFilter = faFilter;
  protected readonly faBroom = faBroom;
  faPlus = faPlus;
  displayedColumns: string[] = [
    'id',
    'nome',
    'valor',
    'quantidadeDisponivel',
    'quantidadePedidos',
    'quantidadePendencias',
    'dataCadastro',
    'dataAtualizacao'
  ];
  dataSource: any[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  valor: number;

  filtroKitLivroForm!: FormGroup;

  constructor(private kitLivroService: KitLivroService) {
    this.listar();
    this.valor = 0;
  }

  ngOnInit() {
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.filtroKitLivroForm = new FormGroup({
      nome: new FormControl(""),
      valor: new FormControl(""),
      quantidadeDisponivel: new FormControl("")
    });
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
    if (this.filtrosPreenchidos()) {
      this.filtrar(event.pageIndex, event.pageSize);
      return;
    }

    this.listar(event.pageIndex, event.pageSize);
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!this.filtrosPreenchidos()) {
      this.listar(pageIndex,pageSize);
      return;
    }

    const filtroKitLivro = this.filtroKitLivroForm.value;
    this.kitLivroService.filtrar(pageIndex,pageSize,filtroKitLivro).subscribe(response => {
      this.dataSource = response.content;
      this.totalElements = response.totalElements;
      this.pageSize = response.size;
      this.pageIndex = response.number;
    });
  }

  limparFiltros() {
    this.filtroKitLivroForm.reset();
    this.listar();
  }

  filtrosPreenchidos() {
    return Object.keys(this.filtroKitLivroForm.controls).some(key => {
      const control = this.filtroKitLivroForm.get(key);
      return control?.value !== "" && control?.value !== null && control?.value !== undefined;
    });
  }
}
