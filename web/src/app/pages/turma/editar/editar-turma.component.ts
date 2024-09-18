import {Component} from '@angular/core';
import {FooterComponent} from "../../../components/footer/footer.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SerieService} from "../../../services/serie/serie.service";
import {TurmaService} from "../../../services/turma/turma.service";
import {MessageService} from "../../../services/message/message.service";
import {AlunoService} from "../../../services/aluno/aluno.service";
import {ERROR, formatDate, obterControle, selectValidator, SUCCESS} from "../../../core/functions";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {BotaoSalvarComponent} from "../../../components/botao/botao-salvar/botao-salvar.component";
import {BotaoVoltarComponent} from "../../../components/botao/botao-voltar/botao-voltar.component";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {DadosComboSerie} from "../../../interfaces/serie/dadosComboSerie";
import {NgForOf} from "@angular/common";
import {TabelaGenericaComponent} from "../../../components/tabela-generica/tabela-generica.component";
import {LISTAGEM_ALUNO} from "../../../const/aluno/const-aluno";
import {MessagesComponent} from "../../../components/messages/messages.component";

@Component({
  selector: 'app-editar-turma',
  standalone: true,
  imports: [
    FooterComponent,
    ConteudoComponent,
    BreadcrumbComponent,
    MenuNavComponent,
    MatTabGroup,
    BotaoSalvarComponent,
    BotaoVoltarComponent,
    FormsModule,
    MatTab,
    MensagemErroComponent,
    ReactiveFormsModule,
    NgForOf,
    TabelaGenericaComponent,
    MessagesComponent
  ],
  templateUrl: './editar-turma.component.html',
  styleUrl: './editar-turma.component.css'
})
export class EditarTurmaComponent {
  ////////////////
  // FORMULARIO //
  ////////////////

  turmaEditar!: string;
  turmaForm!: FormGroup;
  turmaId!: number;
  series!: DadosComboSerie[];
  protected readonly obterControle = obterControle;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serieService: SerieService,
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private messageService: MessageService
  ) {
    this.carregarComboSerie();
  }

  ngOnInit() {
    this.carregarTurma();
    this.inicializarFormulario()
  }

  carregarTurma() {
    const idConsulta = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idConsulta) {
      this.messageService.add("Turma não encontrada.", ERROR);
      this.router.navigateByUrl("/turma");
      return;
    }

    this.turmaService.detalhar(idConsulta).subscribe({
      next: (dados) => {
        dados.dataCadastro = formatDate(dados.dataCadastro);
        dados.dataAtualizacao = formatDate(dados.dataAtualizacao);

        this.turmaEditar = `${dados.id}: ${dados.nome}`;
        this.turmaId = dados.id;
        this.turmaForm.patchValue(dados);

        this.listarAlunos();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.router.navigateByUrl("/turma");
      }
    });
  }

  carregarComboSerie() {
    this.serieService.carregarCombo().subscribe(response => {
      this.series = response;
    });
  }

  atualizarTurma() {
    const turma = this.turmaForm.value;
    this.turmaService.atualizar(turma).subscribe({
      next: (dadosResponse) => {
        this.messageService.add("Turma atualizada com sucesso!", SUCCESS);
        this.carregarTurma();
        this.redirectEdit();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.carregarTurma();
        this.redirectEdit();
      }
    });
  }

  inicializarFormulario() {
    this.turmaForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", Validators.required),
      serieId: new FormControl("Selecione uma opção", [Validators.required, selectValidator]),
      dataCadastro: new FormControl(""),
      dataAtualizacao: new FormControl("")
    });
  }

  redirect() {
    this.router.navigateByUrl("/turma");
  }

  redirectEdit() {
    this.router.navigate([`/serie/turma/${this.turmaId}`]);
  }

  ////////////
  // ALUNOS //
  ////////////

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
    this.listarAlunos(event.pageIndex, event.pageSize);
  }

  listarAlunos(pageIndex = 0, pageSize = 10) {
    if (this.turmaId) {
      this.alunoService.listarPorTurma(this.turmaId, pageIndex, pageSize).subscribe({
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
      });
    }
  }
}
