import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {MessagesComponent} from "../../components/messages/messages.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {LISTAGEM_TURMA} from "../../const/turma/const-turma";
import {Router} from "@angular/router";
import {TurmaService} from "../../services/turma/turma.service";
import {MessageService} from "../../services/message/message.service";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {faBroom, faFilter} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {SerieService} from "../../services/serie/serie.service";
import {DadosComboSerie} from "../../interfaces/serie/dadosComboSerie";

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
  series!: DadosComboSerie[]

  constructor(
    private router: Router,
    private turmaService: TurmaService,
    private serieService: SerieService,
    private messageService: MessageService
  ) {
    this.listar();
    this.carregarComboSerie();
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
    this.turmaService.listar(pageIndex, pageSize).subscribe(response => {
      this.dataSourceTurma = response.content;
      this.totalElementsTurma = response.totalElements;
      this.pageSizeTurma = response.size;
      this.pageIndexTurma = response.number;
    });
  }

  carregarComboSerie() {
    this.serieService.carregarCombo().subscribe(response => {
      this.series = response;
    });
  }

  onPageChangeTurma(event: any) {
    if (this.filtrosPreenchidos()) {
      this.filtrar(event.pageIndex, event.pageSize);
      return;
    }

    this.listar(event.pageIndex, event.pageSize);
  }

  filtrosPreenchidos() {
    return Object.keys(this.turmaForm.controls).some(key => {
      const control = this.turmaForm.get(key);
      return control?.value !== "" &&
        control?.value !== "Selecione uma opção" &&
        control?.value !== null &&
        control?.value !== undefined;
    });
  }

  filtrar(pageIndex = 0, pageSize = 10) {
    if (!this.filtrosPreenchidos()) {
      this.listar(pageIndex, pageSize);
      return;
    }

    const filtros = this.turmaForm.value;
    console.log(filtros);
    this.turmaService.filtrar(pageIndex,pageSize,filtros).subscribe(response => {
      this.dataSourceTurma = response.content;
      this.totalElementsTurma = response.totalElements;
      this.pageSizeTurma = response.size;
      this.pageIndexTurma = response.number;
    })
  }

  limparFiltros() {
    this.turmaForm.reset();
    this.turmaForm.get("serieId")?.setValue("Selecione uma opção");
    this.listar();
  }
}
