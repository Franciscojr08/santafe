import {Component, Injector} from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {MessagesComponent} from "../../components/messages/messages.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {ERROR, filtrosPreenchidos, SUCCESS, WARNING} from "../../utils/functions";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LISTAGEM_ALUNO} from "../../const/aluno/listagem_aluno";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {MessageService} from "../../services/message/message.service";
import {NotificationService} from "../../services/notification/notification.service";
import {AlunoService} from "../../services/aluno/aluno.service";
import {ClienteService} from "../../services/cliente/cliente.service";
import {NgClass, NgForOf} from "@angular/common";
import {faBroom, faFilter} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgxMaskDirective} from "ngx-mask";
import {TurmaService} from "../../services/turma/turma.service";
import {DadosCombo} from "../../interfaces/dadosCombo";
import {DadosExclusao} from "../../interfaces/dadosExclusao";

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    MessagesComponent,
    FooterComponent,
    FieldsetComponent,
    TabelaGenericaComponent,
    BotaoCadastrarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    FaIconComponent,
    NgClass,
    NgxMaskDirective
  ],
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.css'
})
export class AlunoComponent {
  protected readonly faBroom = faBroom;
  protected readonly faFilter = faFilter;
  protected readonly filtrosPreenchidos = filtrosPreenchidos;


  alunoForm !: FormGroup;
  clientes!: DadosCombo[]
  turmas!: DadosCombo[]

  constructor(
    private messageService: MessageService,
    private notificationService: NotificationService,
    private injetor: Injector,
    private alunoService: AlunoService,
    private clienteService: ClienteService,
    private turmaService: TurmaService
  ) {

    this.notificationService.deleteConfirmed$.subscribe((dadosExclusao: DadosExclusao) => {
      if (dadosExclusao.component == this.getSeletorComponent()) {
        this.deletarAluno(dadosExclusao.id);
      }
    });
  }

  ngOnInit() {
    this.listar();
    this.carregarComboCliente();
    this.carregarComboTurma();
    this.inicializarFormulario();
  }

  protected readonly LISTAGEM_ALUNO = LISTAGEM_ALUNO;
  displayedColumnsAluno: string[] = [
    'id',
    'nome',
    'clienteNome',
    'matricula',
    'rg',
    'cpf',
    'turmaNome',
    'dataCadastro',
    'dataAtualizacao',
  ];
  dataSourceAluno: any[] = [];
  totalElementsAluno: number = 0;
  pageSizeAluno: number = 10;
  pageIndexAluno: number = 0;

  onPageChangeAluno(event: any) {
    this.listar(event.pageIndex, event.pageSize);
  }

  listar(pageIndex = 0, pageSize = 10) {
    this.alunoService.listar(pageIndex, pageSize).subscribe({
      next: (response) => {
        this.dataSourceAluno = response.content;
        this.totalElementsAluno = response.totalElements;
        this.pageSizeAluno = response.size;
        this.pageIndexAluno = response.number;
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
      }
    })
  }

  getSeletorComponent() {
    return (this.injetor.get(AlunoComponent).constructor as any).ɵcmp.selector;
  }

  carregarComboCliente() {
      this.clienteService.carregarCombo().subscribe(response => {
        this.clientes = response;
      })
  }

  carregarComboTurma() {
    this.turmaService.combo().subscribe(response => {
      this.turmas = response;
    })
  }

  inicializarFormulario() {
    this.alunoForm = new FormGroup({
      nome: new FormControl(""),
      clienteId: new FormControl("Selecione uma opção"),
      turmaId: new FormControl("Selecione uma opção"),
      matricula: new FormControl(""),
      rg: new FormControl(""),
      cpf: new FormControl("")
    });
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!filtrosPreenchidos(this.alunoForm)) {
      this.listar(pageIndex, pageSize);
      return;
    }

    const filtros = this.alunoForm.value;

    if (filtros.clienteId === 'Selecione uma opção') {
      filtros.clienteId = null;
    }

    if (filtros.turmaId === 'Selecione uma opção') {
      filtros.turmaId = null;
    }

    this.alunoService.filtrar(pageIndex,pageSize,filtros).subscribe({
      next: (response) => {
        this.dataSourceAluno = response.content;
        this.totalElementsAluno = response.totalElements;
        this.pageSizeAluno = response.size;
        this.pageIndexAluno = response.number;
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.limparFiltros();
      }
    });
  }

  limparFiltros() {
    this.alunoForm.reset();
    this.alunoForm.get("clienteId")?.setValue("Selecione uma opção");
    this.alunoForm.get("turmaId")?.setValue("Selecione uma opção");
    this.listar();
  }

  private deletarAluno(id: number) {
    this.alunoService.deletar(id).subscribe( {
      next: (dadosResponse) => {
        if (dadosResponse.status == HttpStatusCode.Ok) {
          this.listar();
          this.messageService.add("Aluno deletado com sucesso!",SUCCESS);
          return;
        }

        this.messageService.add("Ocorreu um erro ao tentar excluir o aluno. Tente novamente!",WARNING);
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
      }
    });
  }
}
