import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../../components/menu-nav/menu-nav.component";
import {FooterComponent} from "../../../../components/footer/footer.component";
import {ConteudoComponent} from "../../../../components/conteudo/conteudo.component";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule} from "ng2-currency-mask";
import {BotaoCadastrarComponent} from "../../../../components/botao/botao-cadastrar/botao-cadastrar.component";
import {BotaoEnviarComponent} from "../../../../components/botao/botao-enviar/botao-enviar.component";
import {BotaoCancelarComponent} from "../../../../components/botao/botao-cancelar/botao-cancelar.component";
import {MensagemErroComponent} from "../../../../components/mensagem-erro/mensagem-erro.component";
import {Router} from "@angular/router";
import {KitLivroService} from "../../../../services/kit-livro/kit-livro.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../../services/message/message.service";
import {ERROR, INFO, SUCCESS} from "../../../../core/functions";

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
@Component({
  selector: 'app-cadastrar-kit-livro',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    FooterComponent,
    ConteudoComponent,
    FormsModule,
    CurrencyMaskModule,
    BotaoCadastrarComponent,
    BotaoEnviarComponent,
    BotaoCancelarComponent,
    ReactiveFormsModule,
    MensagemErroComponent,
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  templateUrl: './cadastrar-kit-livro.component.html',
  styleUrl: './cadastrar-kit-livro.component.css'
})
export class CadastrarKitLivroComponent {
  valor: number;
  kitLivroForm!: FormGroup;

  constructor(
    private router: Router,
    private kitLivroService: KitLivroService,
    private messageService: MessageService
  ) {
    this.valor = 0;
  }

  ngOnInit() {
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.kitLivroForm = new FormGroup({
      nome: new FormControl("",Validators.required),
      valor: new FormControl("", Validators.required),
      quantidadeDisponivel: new FormControl("",Validators.required),
      descricao: new FormControl("")
    })
  }

  cadastrarKitLivro() {
    const kitLivro = this.kitLivroForm.value;
    this.kitLivroService.cadastrar(kitLivro).subscribe({
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

  obterControle(nome: string): FormControl {
    const control = this.kitLivroForm.get(nome);

    if (!control) {
      throw new Error("Controle de formulário não encontrado: " + nome);
    }

    return control as FormControl;
  }

  limparFormularioERedirecionar() {
    this.kitLivroForm.reset();
    this.router.navigateByUrl("/kit-livro")
  }
}
