import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "../../../services/message/message.service";
import {LivroService} from "../../../services/livro/livro.service";
import {SerieService} from "../../../services/serie/serie.service";
import {DadosComboSerie} from "../../../interfaces/serie/dadosComboSerie";
import {ERROR, obterControle, SUCCESS} from "../../../utils/functions";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {NgForOf, NgIf} from "@angular/common";
import {BotaoCancelarComponent} from "../../../components/botao/botao-cancelar/botao-cancelar.component";
import {BotaoEnviarComponent} from "../../../components/botao/botao-enviar/botao-enviar.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    FooterComponent,
    ConteudoComponent,
    ReactiveFormsModule,
    MensagemErroComponent,
    CurrencyMaskModule,
    NgForOf,
    BotaoCancelarComponent,
    BotaoEnviarComponent,
    NgIf
  ],
  templateUrl: './cadastrar-livro.component.html',
  styleUrl: './cadastrar-livro.component.css'
})
export class CadastrarLivroComponent {
  protected readonly obterControle = obterControle;
  livroForm!: FormGroup;
  series!: DadosComboSerie[];

  constructor(
    private router: Router,
    private livroService: LivroService,
    private serieService: SerieService,
    private messageService: MessageService
  ) {
    this.carregarComboSerie();
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.livroForm = new FormGroup({
      identificador: new FormControl("",Validators.required),
      nome: new FormControl("",Validators.required),
      usoInterno: new FormControl("Selecione uma opção", this.validateSelectOption()),
      valor: new FormControl("", Validators.required),
      quantidadeDisponivel: new FormControl("", Validators.required),
      serieId: new FormControl("Selecione uma opção")
    });
  }

  carregarComboSerie() {
    this.serieService.carregarCombo().subscribe(response => {
      this.series = response;
    });
  }

  cadastrarLivro() {
    const livro = this.livroForm.value;

    livro.usoInterno = livro.usoInterno != 0;

    if (livro.serieId === 'Selecione uma opção') {
      livro.serieId = null;
    }

    this.livroService.cadastrar(livro).subscribe( {
      next: (dadosResponse) => {
        this.messageService.add(dadosResponse.mensagem,SUCCESS);
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
    this.livroForm.reset();
    this.router.navigateByUrl("/livro");
  }

  changeObrigatoriedadeSerie(event: any) {
    const serieIdControl = this.livroForm.get('serieId');
    if (serieIdControl == null) {
      return;
    }

    const SIM = 1;
    if (event.target.value == SIM) {
      serieIdControl.setValidators([Validators.required, this.validateSelectOption()]);
      serieIdControl.enable();
    } else {
      serieIdControl.clearValidators();
      serieIdControl.setValue("Selecione uma opção");
      serieIdControl.disable();
    }

    serieIdControl.updateValueAndValidity();
  }

  validateSelectOption(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value === "Selecione uma opção" ? { invalidOption: true } : null;
    };
  }

  isSerieIdRequired(): boolean {
    const serieIdControl = this.livroForm.get('serieId');
    if (serieIdControl == null) {
      return false;
    }

    return serieIdControl.hasValidator(Validators.required);
  }
}
