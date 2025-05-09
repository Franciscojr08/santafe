import {Component, Injector} from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {MessagesComponent} from "../../components/messages/messages.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {LISTAGEM_TURMA} from "../../const/turma/listagem_turma";
import {TurmaService} from "../../services/turma/turma.service";
import {MessageService} from "../../services/message/message.service";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {faBroom, faFilter} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {SerieService} from "../../services/serie/serie.service";
import {NotificationService} from "../../services/notification/notification.service";
import {DadosExclusao} from "../../interfaces/dadosExclusao";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {ERROR, filtrosPreenchidos, SUCCESS, WARNING} from "../../utils/functions";
import {DadosCombo} from "../../interfaces/dadosCombo";

@Component({
  selector: 'app-turma',
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
    FaIconComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './turma.component.html',
  styleUrl: './turma.component.css'
})
export class TurmaComponent {
  protected readonly filtrosPreenchidos = filtrosPreenchidos;
  protected readonly faFilter = faFilter;
  protected readonly faBroom = faBroom;
  protected readonly LISTAGEM_TURMA = LISTAGEM_TURMA;

  displayedColumnsTurma: string[] = [
    'id',
    'nome',
    'serieNome',
    'quantidadeAlunos',
    'dataCadastro',
    'dataAtualizacao',
  ];
  dataSourceTurma: any[] = [];
  totalElementsTurma: number = 0;
  pageSizeTurma: number = 10;
  pageIndexTurma: number = 0;
  turmaForm!: FormGroup;
  series!: DadosCombo[]

  constructor(
    private turmaService: TurmaService,
    private serieService: SerieService,
    private messageService: MessageService,
    private injetor: Injector,
    private notificationService: NotificationService
  ) {
    this.listar();
    this.carregarComboSerie();

    this.notificationService.deleteConfirmed$.subscribe((dadosExclusao: DadosExclusao) => {
      if (dadosExclusao.component == this.getSeletorComponent()) {
        this.deletarTurma(dadosExclusao.id);
      }
    });
  }

  ngOnInit() {
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.turmaForm = new FormGroup({
      nome: new FormControl(""),
      serieId: new FormControl("Selecione uma opção")
    });
  }

  listar(pageIndex = 0, pageSize = 10) {
    this.turmaService.listar(pageIndex, pageSize).subscribe( {
      next: (response) => {
        this.dataSourceTurma = response.content;
        this.totalElementsTurma = response.totalElements;
        this.pageSizeTurma = response.size;
        this.pageIndexTurma = response.number;
      },
        error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
      }
    });
  }

  carregarComboSerie() {
    this.serieService.carregarCombo().subscribe(response => {
      this.series = response;
    });
  }

  onPageChangeTurma(event: any) {
    if (filtrosPreenchidos(this.turmaForm)) {
      this.filtrar(event.pageIndex, event.pageSize);
      return;
    }

    this.listar(event.pageIndex, event.pageSize);
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!filtrosPreenchidos(this.turmaForm)) {
      this.listar(pageIndex, pageSize);
      return;
    }

    const filtros = this.turmaForm.value;

    if (filtros.serieId === 'Selecione uma opção') {
      filtros.serieId = null;
    }

    this.turmaService.filtrar(pageIndex,pageSize,filtros).subscribe({
      next: (response) => {
        this.dataSourceTurma = response.content;
        this.totalElementsTurma = response.totalElements;
        this.pageSizeTurma = response.size;
        this.pageIndexTurma = response.number;
      },
        error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.limparFiltros();
      }
    })
  }

  limparFiltros() {
    this.turmaForm.reset();
    this.turmaForm.get("serieId")?.setValue("Selecione uma opção");
    this.listar();
  }

  getSeletorComponent() {
    return (this.injetor.get(TurmaComponent).constructor as any).ɵcmp.selector;
  }

  deletarTurma(id: number) {
    this.turmaService.deletar(id).subscribe( {
      next: (dadosResponse) => {
        if (dadosResponse.status == HttpStatusCode.Ok) {
          this.listar();
          this.messageService.add("Turma deletada com sucesso!",SUCCESS);
          return;
        }

        this.messageService.add("Ocorreu um erro ao tentar excluir a turma. Tente novamente!",WARNING);
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
      }
    });
  }
}
