import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {MessagesComponent} from "../../../components/messages/messages.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ActivatedRoute, Router} from "@angular/router";
import {PedidoService} from "../../../services/pedido/pedido.service";
import {ListaPendenciaService} from "../../../services/lista-pendencia/lista-pendencia.service";
import {MessageService} from "../../../services/message/message.service";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {ERROR, formatDate, obterControle, SUCCESS} from '../../../utils/functions';
import {LivroService} from "../../../services/livro/livro.service";
import { LISTAGEM_PENDENCIA } from '../../../const/pendencia/const-pendencia';
import { LISTAGEM_PEDIDO } from '../../../const/pedido/const-pedido';
import {TabelaGenericaComponent} from "../../../components/tabela-generica/tabela-generica.component";
import {HttpErrorResponse} from "@angular/common/http";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {NgForOf, NgIf} from "@angular/common";
import {SerieService} from "../../../services/serie/serie.service";
import {DadosComboSerie} from "../../../interfaces/serie/dadosComboSerie";
import {BotaoSalvarComponent} from "../../../components/botao/botao-salvar/botao-salvar.component";
import {BotaoVoltarComponent} from "../../../components/botao/botao-voltar/botao-voltar.component";

@Component({
  selector: 'app-editar-livro',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    MessagesComponent,
    FooterComponent,
    MatTab,
    MatTabGroup,
    TabelaGenericaComponent,
    ReactiveFormsModule,
    MensagemErroComponent,
    CurrencyMaskModule,
    NgForOf,
    NgIf,
    BotaoSalvarComponent,
    BotaoVoltarComponent
  ],
  templateUrl: './editar-livro.component.html',
  styleUrl: './editar-livro.component.css'
})
export class EditarLivroComponent {
  ////////////////
  // FORMULARIO //
  ////////////////

  livroForm!: FormGroup
  livroEditar: string = ""
  livroId!: number
  series!: DadosComboSerie[];
  protected readonly obterControle = obterControle;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService,
    private pedidoService: PedidoService,
    private listaPendenciaService: ListaPendenciaService,
    private messageService: MessageService,
    private serieService: SerieService
  ) {
  }

  ngOnInit() {
    this.carregarLivro();
    this.inicializarFormulario();
    this.carregarComboSerie();
  }

  carregarLivro() {
    const idConsulta = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idConsulta) {
      this.messageService.add("Livro não encontrado.", ERROR);
      this.router.navigateByUrl("/livro");
      return;
    }

    this.livroService.detalhar(idConsulta).subscribe( {
      next: dados => {
        dados.dataCadastro = formatDate(dados.dataCadastro);
        dados.dataAtualizacao = formatDate(dados.dataAtualizacao);
        let usoInterno = dados.usoInterno ? 1 : 0;
        let serie = dados.serieId ? dados.serieId : "Selecione uma opção";

        this.livroEditar = `${dados.id}: ${dados.nome}`;
        this.livroId = dados.id;
        this.livroForm.patchValue(dados);
        this.livroForm.get("usoInterno")?.setValue(usoInterno);
        this.livroForm.get("serieId")?.setValue(serie);

        this.listarPedidos();
        this.listarPendencias();

      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.router.navigateByUrl("/livro");
      }
    })
  }

  carregarComboSerie() {
    this.serieService.carregarCombo().subscribe(response => {
      this.series = response;
    });
  }

  inicializarFormulario() {
    this.livroForm = new FormGroup({
      id: new FormControl(""),
      identificador: new FormControl("", Validators.required),
      nome: new FormControl("", Validators.required),
      usoInterno: new FormControl("Selecione uma opção"),
      serieId: new FormControl("Selecione uma opção"),
      valor: new FormControl("", Validators.required),
      quantidadeDisponivel: new FormControl("", Validators.required),
      dataCadastro: new FormControl(""),
      dataAtualizacao: new FormControl("")
    });
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

  atualizarLivro() {
    const livro = this.livroForm.value;

    livro.usoInterno = livro.usoInterno != 0;

    if (livro.serieId === 'Selecione uma opção') {
      livro.serieId = null;
    }

    this.livroService.atualizar(livro).subscribe({
      next: (dadosResponse) => {
        this.messageService.add("Livro atualizado com sucesso!", SUCCESS);
        this.carregarLivro();
        this.redirectEdit();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.carregarLivro();
        this.redirectEdit();
      }
    });
  }

  redirect() {
    this.router.navigateByUrl("/livro");
  }

  redirectEdit() {
    this.router.navigate([`/livro/editar/${this.livroId}`]);
  }

  ////////////
  // PEDIDO //
  ////////////

  protected readonly LISTAGEM_PEDIDO = LISTAGEM_PEDIDO;
  displayedColumnsPedidos: string[] = [
    'id',
    'dataPedido',
    'nomeCliente',
    'valor',
    'desconto',
    'valorTotal',
    'quantidadeLivros',
    'quantidadeKitLivros',
    'pendencia',
    'formaPagamento',
    'situacao',
  ];
  dataSourcePedido: any[] = [];
  totalElementsPedido: number = 0;
  pageSizePedido: number = 10;
  pageIndexPedido: number = 0;

  listarPedidos(pageIndex = 0, pageSize = 10) {
    if (this.livroId) {
      this.pedidoService.listarPorLivro(this.livroId, pageIndex, pageSize).subscribe({
        next: (response) => {
          this.dataSourcePedido = response.content;
          this.totalElementsPedido = response.totalElements;
          this.pageSizePedido = response.size;
          this.pageIndexPedido = response.number;
        },
        error: (error: HttpErrorResponse) => {
          let dadosErros = error.error;
          this.messageService.add(dadosErros.mensagem, ERROR);
        }
      });
    }
  }

  onPageChangePedido(event: any) {
    this.listarPedidos(event.pageIndex, event.pageSize);
  }

  ///////////////
  // PENDÊNCIA //
  ///////////////

  protected readonly LISTAGEM_PENDENCIA = LISTAGEM_PENDENCIA;
  displayedColumnsPendencia: string[] = [
    'id',
    'pedidoId',
    'nomeCliente',
    'quantidadeLivros',
    'quantidadeLivrosEntregues',
    'quantidadeKitLivros',
    'quantidadeKitLivrosEntregues',
    'situacao',
    'dataCadastro',
    'dataEntrega',
  ];
  dataSourcePendencia: any[] = [];
  totalElementsPendencia: number = 0;
  pageSizePendencia: number = 10;
  pageIndexPendencia: number = 0;

  listarPendencias(pageIndex = 0, pageSize = 10) {
    if (this.livroId) {
      this.listaPendenciaService.listarPorLivro(this.livroId, pageIndex, pageSize).subscribe({
        next: (response) => {
          this.dataSourcePendencia = response.content;
          this.totalElementsPendencia = response.totalElements;
          this.pageSizePendencia = response.size;
          this.pageIndexPendencia = response.number;
        },
        error: (error: HttpErrorResponse) => {
          let dadosErros = error.error;
          this.messageService.add(dadosErros.mensagem, ERROR);
        }
      });
    }
  }

  onPageChangePendencia(event: any) {
    this.listarPendencias(event.pageIndex, event.pageSize);
  }
}
