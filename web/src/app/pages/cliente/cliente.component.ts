import {Component, Injector} from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {MessagesComponent} from "../../components/messages/messages.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LISTAGEM_CLIENTE} from "../../const/cliente/listagem_cliente";
import {ClienteService} from "../../services/cliente/cliente.service";
import {MessageService} from "../../services/message/message.service";
import {NotificationService} from "../../services/notification/notification.service";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {ERROR, filtrosPreenchidos, SUCCESS, WARNING} from "../../utils/functions";
import {faBroom, faFilter} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass} from "@angular/common";
import {NgxMaskDirective} from "ngx-mask";
import {DadosExclusao} from "../../interfaces/dadosExclusao";

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    MessagesComponent,
    FooterComponent,
    FieldsetComponent,
    BotaoCadastrarComponent,
    TabelaGenericaComponent,
    ReactiveFormsModule,
    FaIconComponent,
    NgClass,
    NgxMaskDirective
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clienteForm!: FormGroup;

  protected readonly faFilter = faFilter;
  protected readonly faBroom = faBroom;
  protected readonly filtrosPreenchidos = filtrosPreenchidos;
  protected readonly LISTAGEM_CLIENTE = LISTAGEM_CLIENTE;

  displayedColumns: string[] = [
    "id",
    "nome",
    "cpf",
    "email",
    "responsavelAluno",
    "quantidadeAlunos",
    "quantidadePedidos",
    "dataCadastro",
    "dataAtualizacao",
  ];
  dataSource: any[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private injetor: Injector,
    ) {
    this.listar();

    this.notificationService.deleteConfirmed$.subscribe((dadosExclusao: DadosExclusao) => {
      if (dadosExclusao.component == this.getSeletorComponent()) {
        this.deletarCliente(dadosExclusao.id);
      }
    });
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.clienteForm = new FormGroup({
      nome: new FormControl(""),
      cpf: new FormControl(""),
      email: new FormControl(""),
      responsavel: new FormControl("Selecione uma opção")
    });
  }

  private listar(pageIndex = 0, pageSize = 10) {
    this.clienteService.listar(pageIndex, pageSize).subscribe( {
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

  onPageChangeCliente(event: any) {
    this.listar(event.pageIndex, event.pageSize);
  }

  getSeletorComponent() {
    return (this.injetor.get(ClienteComponent).constructor as any).ɵcmp.selector;
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!filtrosPreenchidos(this.clienteForm)) {
      this.listar(pageIndex, pageSize);
      return;
    }

    const filtros = this.clienteForm.value;

    if (filtros.responsavel === 'Selecione uma opção') {
      filtros.responsavel = null;
    }

    this.clienteService.filtrar(pageIndex, pageSize,filtros).subscribe({
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
    this.clienteForm.reset();
    this.clienteForm.get("responsavel")?.setValue("Selecione uma opção");
    this.listar();
  }

  private deletarCliente(id: number) {
    this.clienteService.deletar(id).subscribe( {
      next: (dadosResponse) => {
        if (dadosResponse.status == HttpStatusCode.Ok) {
          this.listar();
          this.messageService.add("Cliente deletado com sucesso!",SUCCESS);
          return;
        }

        this.messageService.add("Ocorreu um erro ao tentar excluir o cliente. Tente novamente!",WARNING);
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
      }
    });
  }
}
