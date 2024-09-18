import {Component} from '@angular/core';
import {BotaoCancelarComponent} from "../../../components/botao/botao-cancelar/botao-cancelar.component";
import {BotaoEnviarComponent} from "../../../components/botao/botao-enviar/botao-enviar.component";
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {FooterComponent} from "../../../components/footer/footer.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {ActivatedRoute, Router} from "@angular/router";
import {KitLivroService} from "../../../services/kit-livro/kit-livro.service";
import {MessageService} from "../../../services/message/message.service";
import {ERROR, formatDate, obterControle, SUCCESS} from "../../../core/functions";
import {MessagesComponent} from "../../../components/messages/messages.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {BotaoSalvarComponent} from "../../../components/botao/botao-salvar/botao-salvar.component";
import {BotaoVoltarComponent} from "../../../components/botao/botao-voltar/botao-voltar.component";
import {PedidoService} from "../../../services/pedido/pedido.service";
import {LISTAGEM_PEDIDO} from "../../../const/pedido/const-pedido";
import {HttpErrorResponse} from "@angular/common/http";
import {TabelaGenericaComponent} from "../../../components/tabela-generica/tabela-generica.component";
import {ListaPendenciaService} from "../../../services/lista-pendencia/lista-pendencia.service";
import {LISTAGEM_PENDENCIA} from "../../../const/pendencia/const-pendencia";

@Component({
  selector: 'app-editar-kit-livro',
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
    ReactiveFormsModule,
    MessagesComponent,
    MatTabGroup,
    MatTab,
    BotaoSalvarComponent,
    BotaoVoltarComponent,
    TabelaGenericaComponent
  ],
  templateUrl: './editar-kit-livro.component.html',
  styleUrl: './editar-kit-livro.component.css'
})
export class EditarKitLivroComponent {
  ////////////////
  // FORMULARIO //
  ////////////////

  kitLivroForm!: FormGroup;
  kitLivroEditar: string = "";
  kitLivroId?: number;
  protected readonly obterControle = obterControle;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private kitLivroService: KitLivroService,
    private pedidoService: PedidoService,
    private listaPendenciaService: ListaPendenciaService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.carregarKit();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.kitLivroForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", Validators.required),
      valor: new FormControl("", Validators.required),
      quantidadeDisponivel: new FormControl("", Validators.required),
      descricao: new FormControl(""),
      dataCadastro: new FormControl(""),
      dataAtualizacao: new FormControl("")
    });
  }

  carregarKit() {
    const idConsulta = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idConsulta) {
      this.messageService.add("Kit de livro não encontrado.", ERROR);
      this.router.navigateByUrl("/kit-livro");
      return;
    }

    this.kitLivroService.detalhar(idConsulta).subscribe({
      next: (dados) => {
        dados.dataCadastro = formatDate(dados.dataCadastro);
        dados.dataAtualizacao = formatDate(dados.dataAtualizacao);

        this.kitLivroEditar = `${dados.id}: ${dados.nome}`;
        this.kitLivroId = dados.id;
        this.kitLivroForm.patchValue(dados);

        this.listarPedidos();
        this.listarPendencias();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.router.navigateByUrl("/kit-livro");
      }
    });
  }

  atualizarKitLivro() {
    const kitLivro = this.kitLivroForm.value;
    this.kitLivroService.atualizar(kitLivro).subscribe({
      next: (dadosResponse) => {
        this.messageService.add("Kit atualizado com sucesso!", SUCCESS);
        this.carregarKit();
        this.redirectEdit();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.carregarKit();
        this.redirectEdit();
      }
    });
  }

  redirect() {
    this.router.navigateByUrl("/kit-livro");
  }

  redirectEdit() {
    this.router.navigate([`/kit-livro/editar/${this.kitLivroId}`]);
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
    if (this.kitLivroId) {
      this.pedidoService.listarPorKitLivro(this.kitLivroId, pageIndex, pageSize).subscribe({
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
    if (this.kitLivroId) {
      this.listaPendenciaService.listarPorKitLivro(this.kitLivroId, pageIndex, pageSize).subscribe({
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
