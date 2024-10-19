import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {KitLivroComponent} from "./pages/kit-livro/kit-livro.component";
import {LivroComponent} from "./pages/livro/livro.component";
import {SerieComponent} from "./pages/serie/serie.component";
import {TurmaComponent} from "./pages/turma/turma.component";
import {ClienteComponent} from "./pages/cliente/cliente.component";
import {AlunoComponent} from "./pages/aluno/aluno.component";
import {PedidoComponent} from "./pages/pedido/pedido.component";
import {PendenciaComponent} from "./pages/pendencia/pendencia.component";
import {CadastrarKitLivroComponent} from "./pages/kit-livro/cadastrar/cadastrar-kit-livro.component";
import {EditarKitLivroComponent} from "./pages/kit-livro/editar/editar-kit-livro.component";
import {CadastrarSerieComponent} from "./pages/serie/cadastrar/cadastrar-serie.component";
import {EditarSerieComponent} from "./pages/serie/editar/editar-serie.component";
import {CadastrarTurmaComponent} from "./pages/turma/cadastrar/cadastrar-turma.component";
import {EditarTurmaComponent} from "./pages/turma/editar/editar-turma.component";
import {CadastrarLivroComponent} from "./pages/livro/cadastrar/cadastrar-livro.component";
import {EditarLivroComponent} from "./pages/livro/editar/editar-livro.component";
import {CadastrarClienteComponent} from "./pages/cliente/cadastrar/cadastrar-cliente.component";
import {EditarClienteComponent} from "./pages/cliente/editar/editar-cliente.component";
import {CadastrarAlunoComponent} from "./pages/aluno/cadastrar/cadastrar-aluno.component";

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "cliente", component: ClienteComponent },
  { path: "cliente/cadastrar", component: CadastrarClienteComponent },
  { path: "cliente/editar/:id", component: EditarClienteComponent },
  { path: "cliente/editar/", redirectTo: "/cliente" },
  { path: "aluno", component: AlunoComponent },
  { path: "aluno/cadastrar", component: CadastrarAlunoComponent },
  { path: "pedido", component: PedidoComponent },
  { path: "pendencia", component: PendenciaComponent },
  { path: "kit-livro", component: KitLivroComponent },
  { path: "kit-livro/cadastrar", component: CadastrarKitLivroComponent },
  { path: "kit-livro/editar/:id", component: EditarKitLivroComponent },
  { path: "kit-livro/editar", redirectTo: "/kit-livro" },
  { path: "livro", component: LivroComponent },
  { path: "livro/cadastrar", component: CadastrarLivroComponent },
  { path: "livro/editar/:id", component: EditarLivroComponent },
  { path: "livro/editar/", redirectTo: "/livro" },
  { path: "serie", component: SerieComponent },
  { path: "serie/cadastrar", component: CadastrarSerieComponent },
  { path: "serie/editar/:id", component: EditarSerieComponent },
  { path: "serie/editar", redirectTo: "/serie" },
  { path: "turma", component: TurmaComponent },
  { path: "turma/cadastrar", component: CadastrarTurmaComponent },
  { path: "turma/editar/:id", component: EditarTurmaComponent },
  { path: "turma/editar/", redirectTo: "/turma" },
];
