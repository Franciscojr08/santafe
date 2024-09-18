import { Component } from '@angular/core';
import {FooterComponent} from "../../../components/footer/footer.component";
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {BotaoCancelarComponent} from "../../../components/botao/botao-cancelar/botao-cancelar.component";
import {BotaoEnviarComponent} from "../../../components/botao/botao-enviar/botao-enviar.component";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {NgForOf} from "@angular/common";
import {DadosComboSerie} from "../../../interfaces/serie/dadosComboSerie";
import {Router} from "@angular/router";
import {TurmaService} from "../../../services/turma/turma.service";
import {SerieService} from "../../../services/serie/serie.service";
import {MessageService} from "../../../services/message/message.service";
import {ERROR, obterControle, selectValidator, SUCCESS} from "../../../core/functions";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-cadastrar-turma',
  standalone: true,
  imports: [
    FooterComponent,
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    BotaoCancelarComponent,
    BotaoEnviarComponent,
    FormsModule,
    MensagemErroComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './cadastrar-turma.component.html',
  styleUrl: './cadastrar-turma.component.css'
})
export class CadastrarTurmaComponent {
  protected readonly obterControle = obterControle;
  turmaForm!: FormGroup;
  series!: DadosComboSerie[]

  constructor(
    private router: Router,
    private turmaService: TurmaService,
    private serieService: SerieService,
    private messageService: MessageService
  ) {
    this.carregarComboSerie();
  }

  ngOnInit() {
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.turmaForm = new FormGroup({
      nome: new FormControl("", Validators.required),
      serieId: new FormControl("Selecione uma opção", [Validators.required, selectValidator])
    });
  }

  carregarComboSerie() {
    this.serieService.carregarCombo().subscribe(response => {
      this.series = response;
    });
  }

  cadastrarTurma() {
    const turma = this.turmaForm.value;
    this.turmaService.cadastrar(turma).subscribe({
      next: (dadosResponse) => {
        this.messageService.add(dadosResponse.mensagem,SUCCESS);
        this.limparFormularioERedirecionar();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
        this.limparFormularioERedirecionar();
      }
    });
  }

  limparFormularioERedirecionar() {
    this.turmaForm.reset();
    this.router.navigateByUrl("/turma")
  }
}
