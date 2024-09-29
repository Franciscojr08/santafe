import {Component, Injector} from '@angular/core';
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {KitLivroService} from "../../services/kit-livro/kit-livro.service";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {LISTAGEM_KIT_LIVRO} from "../../const/kit-livro/const-kit-livro";
import {TotalRegistrosComponent} from "../../components/total-registros/total-registros.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {faBroom, faFilter} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {RouterLink} from "@angular/router";
import {MessagesComponent} from "../../components/messages/messages.component";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {ERROR, filtrosPreenchidos, SUCCESS, WARNING} from "../../utils/functions";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {MessageService} from "../../services/message/message.service";
import {NotificationService} from "../../services/notification/notification.service";
import {DadosExclusao} from "../../interfaces/dadosExclusao";


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
  protected readonly filtrosPreenchidos = filtrosPreenchidos;
  protected readonly faFilter = faFilter;
  protected readonly faBroom = faBroom;

  LISTAGEM_KIT_LIVRO = LISTAGEM_KIT_LIVRO;
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

  constructor(
    protected kitLivroService: KitLivroService,
    private messageService: MessageService,
    private injetor: Injector,
    private notificationService: NotificationService
  ) {
    this.listar();
    this.valor = 0;

    this.notificationService.deleteConfirmed$.subscribe((dadosExclusao: DadosExclusao) => {
      if (dadosExclusao.component == this.getSeletorComponent()) {
        this.deletarKit(dadosExclusao.id);
      }
    });
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
    this.kitLivroService.listar(pageIndex, pageSize).subscribe( {
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

  onPageChange(event: any) {
    if (filtrosPreenchidos(this.filtroKitLivroForm)) {
      this.filtrar(event.pageIndex, event.pageSize);
      return;
    }

    this.listar(event.pageIndex, event.pageSize);
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!filtrosPreenchidos(this.filtroKitLivroForm)) {
      this.listar(pageIndex, pageSize);
      return;
    }

    const filtroKitLivro = this.filtroKitLivroForm.value;
    this.kitLivroService.filtrar(pageIndex, pageSize, filtroKitLivro).subscribe( {
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
    this.filtroKitLivroForm.reset();
    this.listar();
  }

  getSeletorComponent() {
    return (this.injetor.get(KitLivroComponent).constructor as any).ɵcmp.selector;
  }

  private deletarKit(id: number) {
    this.kitLivroService.deletar(id).subscribe({
      next: (dadosResponse) => {
        if (dadosResponse.status == HttpStatusCode.Ok) {
          this.listar();
          this.messageService.add("Kit deletado com sucesso!",SUCCESS);
          return;
        }

        this.messageService.add("Ocorreu um erro ao tentar excluir o kit de livro. Tente novamente!",WARNING);
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
      }
    });
  }
}
