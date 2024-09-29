import {Component, Injector} from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {MessagesComponent} from "../../components/messages/messages.component";
import {LISTAGEM_LIVRO} from "../../const/livro/const-livro";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {SerieService} from "../../services/serie/serie.service";
import {MessageService} from "../../services/message/message.service";
import {NotificationService} from "../../services/notification/notification.service";
import {LivroService} from "../../services/livro/livro.service";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DadosComboSerie} from "../../interfaces/serie/dadosComboSerie";
import {NgClass, NgForOf} from "@angular/common";
import {faBroom, faFilter} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {ERROR, filtrosPreenchidos, SUCCESS, WARNING} from "../../utils/functions";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {DadosExclusao} from "../../interfaces/dadosExclusao";

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    FieldsetComponent,
    FooterComponent,
    MessagesComponent,
    TabelaGenericaComponent,
    BotaoCadastrarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    FaIconComponent,
    NgClass,
    CurrencyMaskModule
  ],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {
  protected readonly filtrosPreenchidos = filtrosPreenchidos;
  protected readonly faBroom = faBroom;
  protected readonly faFilter = faFilter;
  protected readonly LISTAGEM_LIVRO = LISTAGEM_LIVRO;
  displayedColumnsLivro: string[] = [
    'id',
    'identificador',
    'nome',
    'usoInterno',
    'serieNome',
    'valor',
    'quantidadeDisponivel',
    'quantidadePedidos',
    'quantidadePendencias',
    'dataCadastro',
    'dataAtualizacao',
  ];
  dataSource: any[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  livroForm!: FormGroup;
  series!: DadosComboSerie[];

  constructor(
    private injetor: Injector,
    private livroService: LivroService,
    private serieService: SerieService,
    private messageService: MessageService,
    private notificationService: NotificationService
    ) {
    this.listar();
    this.carregarComboSerie();

    this.notificationService.deleteConfirmed$.subscribe((dadosExclusao: DadosExclusao) => {
      if (dadosExclusao.component == this.getSeletorComponent()) {
        this.deletarLivro(dadosExclusao.id);
      }
    });
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  carregarComboSerie() {
    this.serieService.carregarCombo().subscribe(response => {
      this.series = response;
    });
  }

  inicializarFormulario() {
    this.livroForm = new FormGroup({
      nome: new FormControl(""),
      identificador: new FormControl(""),
      usoInterno: new FormControl("Selecione uma opção"),
      serieId: new FormControl("Selecione uma opção"),
      valor: new FormControl(""),
      quantidadeDisponivel: new FormControl("")
    });
  }

  onPageChangeLivro(event: any) {
    this.listar(event.pageIndex, event.pageSize);
  }

  public listar(pageIndex = 0, pageSize = 10) {
    this.livroService.listar(pageIndex, pageSize).subscribe( {
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

  getSeletorComponent() {
    return (this.injetor.get(LivroComponent).constructor as any).ɵcmp.selector;
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!filtrosPreenchidos(this.livroForm)) {
      this.listar(pageIndex, pageSize);
      return;
    }

    const filtros = this.livroForm.value;

    if (filtros.serieId === 'Selecione uma opção') {
      filtros.serieId = null;
    }

    if (filtros.usoInterno === 'Selecione uma opção') {
      filtros.usoInterno = null;
    }

    if (filtros.valor == "") {
      filtros.valor = null;
    }

    this.livroService.filtrar(pageIndex, pageSize, filtros).subscribe( {
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
    })
  }

  limparFiltros() {
    this.livroForm.reset();
    this.livroForm.get("serieId")?.setValue("Selecione uma opção");
    this.livroForm.get("usoInterno")?.setValue("Selecione uma opção");
    this.livroForm.get("valor")?.setValue(0);
    this.listar();
  }

  deletarLivro(id: number) {
    this.livroService.deletar(id).subscribe( {
      next: (dadosResponse) => {
        if (dadosResponse.status == HttpStatusCode.Ok) {
          this.listar();
          this.messageService.add("Livro deletado com sucesso!",SUCCESS);
          return;
        }

        this.messageService.add("Ocorreu um erro ao tentar excluir o livro. Tente novamente!",WARNING);
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
      }
    });
  }
}
