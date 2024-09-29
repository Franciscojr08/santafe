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
import {faBroom, faFilter} from "@fortawesome/free-solid-svg-icons";
import {NgClass} from "@angular/common";
import {DadosExclusao} from "../../interfaces/dadosExclusao";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {ERROR, filtrosPreenchidos, SUCCESS, WARNING} from "../../utils/functions";

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
  protected readonly filtrosPreenchidos = filtrosPreenchidos;
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

    this.notificationService.deleteConfirmed$.subscribe((dadosExclusao: DadosExclusao) => {
      if (dadosExclusao.component == this.getSeletorComponent()) {
        this.deletarSerie(dadosExclusao.id);
      }
    });
  }

  ngOnInit() {
    this.inicializarFormulario()
  }

  listar(pageIndex = 0, pageSize = 10) {
    this.serieService.listar(pageIndex, pageSize).subscribe( {
      next: (response) => {
        this.dataSource = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
      }
    });
  }

  inicializarFormulario() {
    this.serieForm = new FormGroup({
      nome: new FormControl("")
    });
  }

  onPageChange(event: any) {
    if (filtrosPreenchidos(this.serieForm)) {
      this.filtrar(event.pageIndex, event.pageSize);
      return;
    }

    this.listar(event.pageIndex, event.pageSize);
  }

  getSeletorComponent() {
    return (this.injetor.get(SerieComponent).constructor as any).ɵcmp.selector;
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!filtrosPreenchidos(this.serieForm)) {
      this.listar(pageIndex, pageSize);
      return;
    }

    const filtroKitLivro = this.serieForm.value;
    this.serieService.filtrar(pageIndex, pageSize, filtroKitLivro).subscribe( {
      next: (response) => {
        this.dataSource = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      },
        error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.limparFiltros();
      }
    });
  }

  limparFiltros() {
    this.serieForm.reset();
    this.listar();
  }

  private deletarSerie(id: number) {
    this.serieService.deletar(id).subscribe({
      next: (dadosResponse) => {
        if (dadosResponse.status == HttpStatusCode.Ok) {
          this.listar();
          this.messageService.add("Série deletada com sucesso!",SUCCESS);
          return;
        }

        this.messageService.add("Ocorreu um erro ao tentar excluir a série. Tente novamente!",WARNING);
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
      }
    });
  }
}
