import {Component, inject} from '@angular/core';
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {FieldsetComponent} from "../../../components/fieldset/fieldset.component";
import {NgxMaskDirective} from "ngx-mask";
import {BotaoCancelarComponent} from "../../../components/botao/botao-cancelar/botao-cancelar.component";
import {BotaoEnviarComponent} from "../../../components/botao/botao-enviar/botao-enviar.component";
import {Router} from "@angular/router";
import {EnderecoService} from "../../../services/endereco/endereco.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../components/modal/modal.component";
import {cpfValidator, ERROR, obterControle, obterControleEndereco, SUCCESS} from "../../../utils/functions";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {ClienteService} from "../../../services/cliente/cliente.service";
import {MessageService} from "../../../services/message/message.service";

@Component({
  selector: 'app-cadastrar-cliente',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    FooterComponent,
    ReactiveFormsModule,
    FieldsetComponent,
    NgxMaskDirective,
    BotaoCancelarComponent,
    BotaoEnviarComponent,
    MensagemErroComponent
  ],
  templateUrl: './cadastrar-cliente.component.html',
  styleUrl: './cadastrar-cliente.component.css'
})
export class CadastrarClienteComponent {
  clienteForm!: FormGroup
  readonly dialog = inject(MatDialog);
  protected readonly obterControle = obterControle;

  constructor(
    private router: Router,
    private enderecoService: EnderecoService,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.clienteForm = this.formBuilder.group({
      nome: new FormControl("",Validators.required),
      cpf: new FormControl("",[Validators.required, cpfValidator()]),
      telefone: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required, Validators.email]),
      responsavelAluno: new FormControl("Selecione uma opção",this.validateSelectOption()),
      endereco: this.formBuilder.group({
        cep: new FormControl("",Validators.required),
        logradouro: new FormControl("",Validators.required),
        bairro: new FormControl("",Validators.required),
        cidade: new FormControl("",Validators.required),
        estado: new FormControl("",Validators.required)
      })
    });
  }

  cadastrarCliente() {
    const cliente = this.clienteForm.value;
    cliente.responsavelAluno = cliente.responsavelAluno != 0;
    cliente.endereco.cep = cliente.endereco.cep.replace("-","");

    this.clienteService.cadastrar(cliente).subscribe({
      next: (response) => {
        this.messageService.add(response.mensagem,SUCCESS);
        this.limparFormularioERedirecionar();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem,ERROR);
        this.limparFormularioERedirecionar();
      }
    })
  }

  limparFormularioERedirecionar() {
    this.clienteForm.reset();
    this.router.navigateByUrl("/cliente");
  }

  consultarCEP(event: any) {
    let cep = event.target.value;
    if (cep == "" || cep == null) {
      return;
    }

    this.enderecoService.consultarCEP(cep).subscribe( {
      next: (response) => {
        if (response.erro == "true") {
          return;
        }

        this.clienteForm.get('endereco')?.patchValue({
          cep: response.cep,
          logradouro: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.estado
        });

      },
      error: (error: HttpErrorResponse) => {
        this.dialog.open(ModalComponent, {
          data: {
            titulo: `Falha ao consultar o cep: ${cep}`,
            mensagem: 'O cep digitado é inválido ou não foi encontrado na base. <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank">Consulte aqui</a>'
          }
        });

        this.clienteForm.get('endereco')?.reset();
      }
    })
  }

  validateSelectOption(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value === "Selecione uma opção" ? { invalidOption: true } : null;
    };
  }

  protected readonly FormGroup = FormGroup;
  protected readonly obterControleEndereco = obterControleEndereco;
}
