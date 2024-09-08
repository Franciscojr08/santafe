import { Component } from '@angular/core';
import {BotaoCancelarComponent} from "../../../components/botao/botao-cancelar/botao-cancelar.component";
import {BotaoEnviarComponent} from "../../../components/botao/botao-enviar/botao-enviar.component";
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {FooterComponent} from "../../../components/footer/footer.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {Router} from "@angular/router";
import {MessageService} from "../../../services/message/message.service";
import {SerieService} from "../../../services/serie/serie.service";
import {ERROR, SUCCESS} from "../../../core/functions";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-cadastrar-serie',
  standalone: true,
  imports: [
    BotaoCancelarComponent,
    BotaoEnviarComponent,
    BreadcrumbComponent,
    ConteudoComponent,
    CurrencyMaskModule,
    FooterComponent,
    FormsModule,
    MensagemErroComponent,
    MenuNavComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-serie.component.html',
  styleUrl: './cadastrar-serie.component.css'
})
export class CadastrarSerieComponent {
  serieForm!: FormGroup;

  constructor(
    private router: Router,
    private serieService: SerieService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.serieForm = new FormGroup({
      nome: new FormControl("",Validators.required)
    })
  }

  cadastrarSerie() {
    const serie = this.serieForm.value;
    this.serieService.cadastrar(serie).subscribe({
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
    const control = this.serieForm.get(nome);

    if (!control) {
      throw new Error("Controle de formulário não encontrado: " + nome);
    }

    return control as FormControl;
  }

  limparFormularioERedirecionar() {
    this.serieForm.reset();
    this.router.navigateByUrl("/serie")
  }
}
