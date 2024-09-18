import {Component} from '@angular/core';
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {MessagesComponent} from "../../../components/messages/messages.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../../services/message/message.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ERROR, formatDate, obterControle, SUCCESS} from "../../../core/functions";
import {BotaoSalvarComponent} from "../../../components/botao/botao-salvar/botao-salvar.component";
import {BotaoVoltarComponent} from "../../../components/botao/botao-voltar/botao-voltar.component";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {TabelaGenericaComponent} from "../../../components/tabela-generica/tabela-generica.component";
import {HttpErrorResponse} from "@angular/common/http";
import {SerieService} from "../../../services/serie/serie.service";
import {LISTAGEM_LIVRO} from "../../../const/livro/const-livro";
import {LivroService} from "../../../services/livro/livro.service";
import {LISTAGEM_TURMA} from "../../../const/turma/const-turma";
import {TurmaService} from "../../../services/turma/turma.service";

@Component({
  selector: 'app-editar-serie',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    MessagesComponent,
    FooterComponent,
    BotaoSalvarComponent,
    BotaoVoltarComponent,
    CurrencyMaskModule,
    FormsModule,
    MatTab,
    MatTabGroup,
    MensagemErroComponent,
    ReactiveFormsModule,
    TabelaGenericaComponent
  ],
  templateUrl: './editar-serie.component.html',
  styleUrl: './editar-serie.component.css'
})
export class EditarSerieComponent {
  ////////////////
  // FORMULARIO //
  ////////////////

  serieEditar!: string;
  serieForm!: FormGroup;
  serieId!: number;
  protected readonly obterControle = obterControle;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serieService: SerieService,
    private livroService: LivroService,
    private turmaService: TurmaService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.carregarSerie();
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.serieForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", Validators.required),
      dataCadastro: new FormControl(""),
      dataAtualizacao: new FormControl("")
    });
  }

  carregarSerie() {
    const idConsulta = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idConsulta) {
      this.messageService.add("Série não encontrada.", ERROR);
      this.router.navigateByUrl("/serie");
      return;
    }

    this.serieService.detalhar(idConsulta).subscribe({
      next: (dados) => {
        dados.dataCadastro = formatDate(dados.dataCadastro);
        dados.dataAtualizacao = formatDate(dados.dataAtualizacao);

        this.serieEditar = `${dados.id}: ${dados.nome}`;
        this.serieId = dados.id;
        this.serieForm.patchValue(dados);

        this.listarTurmas();
        this.listarLivros();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.router.navigateByUrl("/serie");
      }
    });
  }

  atualizarSerie() {
    const serie = this.serieForm.value;
    this.serieService.atualizar(serie).subscribe({
      next: (dadosResponse) => {
        this.messageService.add("Kit atualizado com sucesso!", SUCCESS);
        this.carregarSerie();
        this.redirectEdit();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.carregarSerie();
        this.redirectEdit();
      }
    });
  }

  redirect() {
    this.router.navigateByUrl("/serie");
  }

  redirectEdit() {
    this.router.navigate([`/serie/editar/${this.serieId}`]);
  }

  ////////////
  // TURMAS //
  ////////////

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

  listarTurmas(pageIndex = 0, pageSize = 10) {
    if (this.serieId) {
      this.turmaService.listarPorSerie(this.serieId, pageIndex, pageSize)
        .subscribe(response => {
          this.dataSourceTurma = response.content;
          this.totalElementsTurma = response.totalElements;
          this.pageSizeTurma = response.size;
          this.pageIndexTurma = response.number;
        });
    }
  }

  onPageChangeTurma(event: any) {
    this.listarTurmas(event.pageIndex, event.pageSize);
  }

  ////////////
  // LIVROS //
  ////////////

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
  dataSourceLivro: any[] = [];
  totalElementsLivro: number = 0;
  pageSizeLivro: number = 10;
  pageIndexLivro: number = 0;

  listarLivros(pageIndex = 0, pageSize = 10) {
    if (this.serieId) {
      this.livroService.listarPorSerie(this.serieId, pageIndex, pageSize)
        .subscribe(response => {
          this.dataSourceLivro = response.content;
          this.totalElementsLivro = response.totalElements;
          this.pageSizeLivro = response.size;
          this.pageIndexLivro = response.number;
        });
    }
  }

  onPageChangeLivro(event: any) {
    this.listarLivros(event.pageIndex, event.pageSize);
  }
}
