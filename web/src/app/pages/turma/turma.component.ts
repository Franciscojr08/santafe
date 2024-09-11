import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {MenuNavComponent} from "../../components/menu-nav/menu-nav.component";
import {ConteudoComponent} from "../../components/conteudo/conteudo.component";
import {MessagesComponent} from "../../components/messages/messages.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {FieldsetComponent} from "../../components/fieldset/fieldset.component";
import {LISTAGEM_TURMA} from "../../const/turma/const-turma";
import {Router} from "@angular/router";
import {TurmaService} from "../../services/turma/turma.service";
import {MessageService} from "../../services/message/message.service";
import {TabelaGenericaComponent} from "../../components/tabela-generica/tabela-generica.component";
import {BotaoCadastrarComponent} from "../../components/botao/botao-cadastrar/botao-cadastrar.component";

@Component({
  selector: 'app-turma',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MenuNavComponent,
    ConteudoComponent,
    MessagesComponent,
    FooterComponent,
    FieldsetComponent,
    TabelaGenericaComponent,
    BotaoCadastrarComponent
  ],
  templateUrl: './turma.component.html',
  styleUrl: './turma.component.css'
})
export class TurmaComponent {
  protected readonly LISTAGEM_TURMA = LISTAGEM_TURMA;
  displayedColumnsTurma: string[] = [
    'id',
    'nome',
    'serieNome',
    'quantidadeAlunos',
    'dataCadastro',
    'dataAtualizacao',
  ];
  dataSourceTurma: any[] = [];
  totalElementsTurma: number = 0;
  pageSizeTurma: number = 10;
  pageIndexTurma: number = 0;

  constructor(
    private router: Router,
    private turmaService: TurmaService,
    private messageService: MessageService
  ) {
    this.listar();
  }

  listar(pageIndex = 0, pageSize = 10) {
    this.turmaService.listar(pageIndex, pageSize).subscribe(response => {
      this.dataSourceTurma = response.content;
      this.totalElementsTurma = response.totalElements;
      this.pageSizeTurma = response.size;
      this.pageIndexTurma = response.number;
    });
  }

  onPageChangeTurma(event: any) {
    this.listar(event.pageIndex, event.pageSize);
  }
}
