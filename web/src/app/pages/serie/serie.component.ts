import {Component, Injector} from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {MessagesComponent} from "../../components/messages/messages.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {LISTAGEM_SERIE} from "../../const/serie/const-serie";
import {SerieService} from "../../services/serie/serie.service";
import {MessageService} from "../../services/message/message.service";
import {NotificationService} from "../../services/notification/notification.service";
import {LISTAGEM_KIT_LIVRO} from "../../const/kit-livro/const-kit-livro";
import {faBroom, faFilter} from "@fortawesome/free-solid-svg-icons";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-serie',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    BotaoCadastrarComponent,
    ConteudoComponent,
    CurrencyMaskModule,
    FaIconComponent,
    FieldsetComponent,
    FooterComponent,
    MessagesComponent,
    ReactiveFormsModule,
    TabelaGenericaComponent,
    NgClass
  ],
  templateUrl: './serie.component.html',
  styleUrl: './serie.component.css'
})
export class SerieComponent {
  protected readonly faFilter = faFilter;
  protected readonly faBroom = faBroom;

  LISTAGEM_SERIE = LISTAGEM_SERIE;
  displayedColumns: string[] = [
    'id',
    'nome',
    'quantidadeTurmas',
    'quantidadeLivros',
    'dataCadastro',
    'dataAtualizacao'
  ];
  dataSource: any[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  serieForm!: FormGroup;

  constructor(
    private serieService: SerieService,
    private messageService: MessageService,
    private injetor: Injector,
    private notificationService: NotificationService
  ) {
    this.listar();
  }

  ngOnInit() {
    this.inicializarFormulario()
  }

  listar(pageIndex = 0, pageSize = 10) {
    this.serieService.listar(pageIndex, pageSize).subscribe(response => {
      this.dataSource = response.content;
      this.totalElements = response.totalElements;
      this.pageSize = response.size;
      this.pageIndex = response.number;
    });
  }

  inicializarFormulario() {
    this.serieForm = new FormGroup({
      nome: new FormControl("")
    });
  }

  filtrosPreenchidos() {
    return Object.keys(this.serieForm.controls).some(key => {
      const control = this.serieForm.get(key);
      return control?.value !== "" && control?.value !== null && control?.value !== undefined;
    });
  }

  onPageChange(event: any) {
    if (this.filtrosPreenchidos()) {
      this.filtrar(event.pageIndex, event.pageSize);
      return;
    }

    this.listar(event.pageIndex, event.pageSize);
  }

  getSeletorComponent() {
    return (this.injetor.get(SerieComponent).constructor as any).ɵcmp.selector;
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!this.filtrosPreenchidos()) {
      this.listar(pageIndex, pageSize);
      return;
    }

    const filtroKitLivro = this.serieForm.value;
    this.serieService.filtrar(pageIndex, pageSize, filtroKitLivro).subscribe(response => {
      this.dataSource = response.content;
      this.totalElements = response.totalElements;
      this.pageSize = response.size;
      this.pageIndex = response.number;
    });
  }

  limparFiltros() {
    this.serieForm.reset();
    this.listar();
  }
}
