import {Component, inject} from '@angular/core';
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../../components/conteudo/conteudo.component";
import {MessagesComponent} from "../../../components/messages/messages.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {cpfValidator, ERROR, formatDate, obterControle, obterControleEndereco, SUCCESS} from "../../../utils/functions";
import {FieldsetComponent} from "../../../components/fieldset/fieldset.component";
import {MensagemErroComponent} from "../../../components/mensagem-erro/mensagem-erro.component";
import {NgxMaskDirective} from "ngx-mask";
import {ActivatedRoute, Router} from "@angular/router";
import {EnderecoService} from "../../../services/endereco/endereco.service";
import {ClienteService} from "../../../services/cliente/cliente.service";
import {MessageService} from "../../../services/message/message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../components/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {BotaoSalvarComponent} from "../../../components/botao/botao-salvar/botao-salvar.component";
import {BotaoVoltarComponent} from "../../../components/botao/botao-voltar/botao-voltar.component";
import { LISTAGEM_ALUNO } from '../../../const/aluno/listagem_aluno';
import {AlunoService} from "../../../services/aluno/aluno.service";
import {TabelaGenericaComponent} from "../../../components/tabela-generica/tabela-generica.component";
import { LISTAGEM_PEDIDO } from '../../../const/pedido/const-pedido';
import {PedidoService} from "../../../services/pedido/pedido.service";

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    MessagesComponent,
    FooterComponent,
    MatTab,
    MatTabGroup,
    FormsModule,
    ReactiveFormsModule,
    FieldsetComponent,
    MensagemErroComponent,
    NgxMaskDirective,
    BotaoSalvarComponent,
    BotaoVoltarComponent,
    TabelaGenericaComponent
  ],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent {
  ////////////////
  // FORMULARIO //
  ////////////////

  protected readonly obterControle = obterControle;
  protected readonly obterControleEndereco = obterControleEndereco;
  readonly dialog = inject(MatDialog);

  clienteEditar: string = "";
  clienteForm!: FormGroup;
  clienteId!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private enderecoService: EnderecoService,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private alunoService: AlunoService,
    private pedidoService: PedidoService,
    private formBuilder: FormBuilder,
  )
  {}

  ngOnInit() {
    this.carregarCliente();
    this.inicializarFormulario();
  }

  private carregarCliente() {
    const idConsulta = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idConsulta) {
      this.messageService.add("Cliente não encontrado.", ERROR);
      this.router.navigateByUrl("/cliente");
      return;
    }

    this.clienteService.detalhar(idConsulta).subscribe({
      next: (response) => {
        response.dataCadastro = formatDate(response.dataCadastro);
        response.dataAtualizacao = formatDate(response.dataAtualizacao);
        let responsavel = response.responsavelAluno ? 1 : 0;

        this.clienteEditar = `${response.id}: ${response.nome}`;
        this.clienteId = response.id;
        this.clienteForm.patchValue(response);
        this.clienteForm.get('responsavelAluno')?.setValue(responsavel);

        this.listarAlunos();
        this.listarPedidos();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.router.navigateByUrl("/cliente");
    }
    })
  }

  inicializarFormulario() {
    this.clienteForm = this.formBuilder.group({
      id: new FormControl(""),
      nome: new FormControl("",Validators.required),
      cpf: new FormControl("",[Validators.required, cpfValidator()]),
      telefone: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required, Validators.email]),
      responsavelAluno: new FormControl("Selecione uma opção",this.validateSelectOption()),
      dataCadastro: new FormControl(""),
      dataAtualizacao: new FormControl(""),
      endereco: this.formBuilder.group({
        cep: new FormControl("",Validators.required),
        logradouro: new FormControl("",Validators.required),
        bairro: new FormControl("",Validators.required),
        cidade: new FormControl("",Validators.required),
        estado: new FormControl("",Validators.required)
      })
    });
  }

  atualizarCliente() {
    const cliente = this.clienteForm.value;
    cliente.responsavelAluno = cliente.responsavelAluno != 0;
    cliente.endereco.cep = cliente.endereco.cep.replace("-","");

    this.clienteService.atualizar(cliente).subscribe({
      next: (response) => {
        this.messageService.add("Cliente atualizado com sucesso!", SUCCESS);
        this.carregarCliente();
        this.redirectEdit();
      },
      error: (error: HttpErrorResponse) => {
        let dadosErros = error.error;
        this.messageService.add(dadosErros.mensagem, ERROR);
        this.carregarCliente();
        this.redirectEdit();
      }
    })
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

  redirect() {
    this.router.navigateByUrl("/cliente");
  }

  redirectEdit() {
    this.router.navigate([`/cliente/editar/${this.clienteId}`]);
  }

  ////////////
  // ALUNOS //
  ////////////

  protected readonly LISTAGEM_ALUNO = LISTAGEM_ALUNO;
  displayedColumnsAluno: string[] = [
    'id',
    'nome',
    'clienteNome',
    'matricula',
    'rg',
    'cpf',
    'turmaNome',
    'dataCadastro',
    'dataAtualizacao',
  ];
  dataSourceAluno: any[] = [];
  totalElementsAluno: number = 0;
  pageSizeAluno: number = 10;
  pageIndexAluno: number = 0;

  onPageChangeAluno(event: any) {
    this.listarAlunos(event.pageIndex, event.pageSize);
  }

  listarAlunos(pageIndex = 0, pageSize = 10) {
    if (this.clienteId) {
      this.alunoService.listarPorCliente(this.clienteId, pageIndex, pageSize).subscribe({
        next: (response) => {
          this.dataSourceAluno = response.content;
          this.totalElementsAluno = response.totalElements;
          this.pageSizeAluno = response.size;
          this.pageIndexAluno = response.number;
        },
        error: (error: HttpErrorResponse) => {
          let dadosErros = error.error;
          this.messageService.add(dadosErros.mensagem, ERROR);
        }
      });
    }
  }

  /////////////
  // PEDIDOS //
  /////////////

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
    if (this.clienteId) {
      this.pedidoService.listarPorCliente(this.clienteId, pageIndex, pageSize).subscribe({
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
}
