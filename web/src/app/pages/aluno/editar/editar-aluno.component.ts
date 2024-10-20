import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {MessagesComponent} from "../../../components/messages/messages.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {DadosCombo} from "../../../interfaces/dadosCombo";
import {cpfValidator, ERROR, formatDate, INFO, obterControle, selectValidator, SUCCESS} from '../../../utils/functions';
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteService} from "../../../services/cliente/cliente.service";
import {TurmaService} from "../../../services/turma/turma.service";
import {MessageService} from "../../../services/message/message.service";
import {AlunoService} from "../../../services/aluno/aluno.service";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {NgForOf} from "@angular/common";
import {NgxMaskDirective} from "ngx-mask";
import {BotaoSalvarComponent} from "../../../components/botao/botao-salvar/botao-salvar.component";
import {BotaoVoltarComponent} from "../../../components/botao/botao-voltar/botao-voltar.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-editar-aluno',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ConteudoComponent,
    MenuNavComponent,
    MessagesComponent,
    FooterComponent,
    MatTabGroup,
    MatTab,
    ReactiveFormsModule,
    MensagemErroComponent,
    NgForOf,
    NgxMaskDirective,
    BotaoSalvarComponent,
    BotaoVoltarComponent
  ],
  templateUrl: './editar-aluno.component.html',
  styleUrl: './editar-aluno.component.css'
})
export class EditarAlunoComponent {
  alunoEditar: string = ""
  protected readonly obterControle = obterControle;

  alunoForm !: FormGroup;
  clientes!: DadosCombo[];
  turmas!: DadosCombo[];
  alunoId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private turmaService: TurmaService,
    private messageService: MessageService,
    private alunoService: AlunoService,
  ) {
    this.messageService.add("Pelo menos um dos campos: Matrícula, RG ou CPF deve ser preenchido.", INFO);
  }

  ngOnInit() {
    this.carregarAluno();
    this.carregarComboCliente();
    this.carregarComboTurma();
    this.inicializarFormulario();
  }

  private carregarAluno() {
    const idConsulta = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idConsulta) {
      this.messageService.add("Aluno não encontrado.", ERROR);
      this.router.navigateByUrl("/aluno");
      return;
    }

    this.alunoService.detalhar(idConsulta).subscribe({
      next: (response) => {
        response.dataCadastro = formatDate(response.dataCadastro);
        response.dataAtualizacao = formatDate(response.dataAtualizacao);

        this.alunoEditar = `${response.id}: ${response.nome}`;
        this.alunoId = response.id;
        this.alunoForm.patchValue(response);
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.router.navigateByUrl("/aluno");
      }
    })
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
      id: new FormControl(""),
      nome: new FormControl('', Validators.required),
      clienteResponsavelId: new FormControl('Selecione uma opção',selectValidator),
      turmaId: new FormControl('Selecione uma opção',selectValidator),
      matricula: new FormControl(''),
      rg: new FormControl(''),
      cpf: new FormControl('',cpfValidator()),
      dataCadastro: new FormControl(""),
      dataAtualizacao: new FormControl(""),
    }, {validators: this.validarCamposIdentificadores()});
  }

  validarCamposIdentificadores(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const matricula = group.get('matricula')?.value;
      const rg = group.get('rg')?.value;
      const cpf = group.get('cpf')?.value;

      if (!matricula && !rg && !cpf) {
        return { identificadoresRequeridos: true };
      }

      return null;
    };
  }

  atualizarAluno() {
    const aluno = this.alunoForm.value

    this.alunoService.atualizar(aluno).subscribe({
      next: (response) => {
        this.messageService.add("Aluno atualizado com sucesso!", SUCCESS);
        this.carregarAluno();
        this.redirectEdit();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.carregarAluno();
        this.redirectEdit();
      }
    })
  }

  redirect() {
    this.messageService.clear();
    this.router.navigateByUrl("/aluno");
  }

  redirectEdit() {
    this.router.navigate([`/aluno/editar/${this.alunoId}`]);
  }
}
