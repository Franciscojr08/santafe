import {Component} from '@angular/core';
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule, ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {DadosCombo} from "../../../interfaces/dadosCombo";
import {MessageService} from "../../../services/message/message.service";
import {ClienteService} from "../../../services/cliente/cliente.service";
import {TurmaService} from "../../../services/turma/turma.service";
import {Router} from "@angular/router";
import {cpfValidator, ERROR, INFO, obterControle, selectValidator, SUCCESS} from "../../../utils/functions";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {NgxMaskDirective} from "ngx-mask";
import {BotaoCancelarComponent} from "../../../components/botao/botao-cancelar/botao-cancelar.component";
import {BotaoEnviarComponent} from "../../../components/botao/botao-enviar/botao-enviar.component";
import {NgForOf, NgIf} from "@angular/common";
import {MessagesComponent} from "../../../components/messages/messages.component";
import {AlunoService} from "../../../services/aluno/aluno.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-cadastrar-aluno',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    FooterComponent,
    FormsModule,
    MensagemErroComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    BotaoCancelarComponent,
    BotaoEnviarComponent,
    NgForOf,
    NgIf,
    MessagesComponent
  ],
  templateUrl: './cadastrar-aluno.component.html',
  styleUrl: './cadastrar-aluno.component.css'
})
export class CadastrarAlunoComponent {
  protected readonly obterControle = obterControle;

  alunoForm !: FormGroup;
  clientes!: DadosCombo[]
  turmas!: DadosCombo[]

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private turmaService: TurmaService,
    private messageService: MessageService,
    private alunoService: AlunoService,
  ) {
    this.messageService.add(
      "Pelo menos um dos campos: Matrícula, RG ou CPF deve ser preenchido.",
      INFO,
      false
    );
  }

  ngOnInit() {
    this.carregarComboCliente();
    this.carregarComboTurma();
    this.inicializarFormulario();
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
      nome: new FormControl('', Validators.required),
      clienteResponsavelId: new FormControl('Selecione uma opção',selectValidator),
      turmaId: new FormControl('Selecione uma opção',selectValidator),
      matricula: new FormControl(''),
      rg: new FormControl(''),
      cpf: new FormControl('',cpfValidator())
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

  limparFormularioERedirecionar(limparMensagem: boolean = true) {
    this.alunoForm.reset();
    this.router.navigateByUrl("/aluno");

    if (limparMensagem) {
      this.messageService.clear();
    }
  }

  cadastrarAluno() {
    this.messageService.clear();
    const aluno = this.alunoForm.value;

    this.alunoService.cadastrar(aluno).subscribe({
      next: (dadosResponse) => {
        this.messageService.add(dadosResponse.mensagem,SUCCESS);
        this.limparFormularioERedirecionar(false);
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
        this.limparFormularioERedirecionar(false);
      }
    })
  }
}
