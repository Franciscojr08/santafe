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

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "cliente", component: ClienteComponent },
  { path: "aluno", component: AlunoComponent },
  { path: "pedido", component: PedidoComponent },
  { path: "pendencia", component: PendenciaComponent },
  { path: "kit-livro", component: KitLivroComponent },
  { path: "kit-livro/cadastrar", component: CadastrarKitLivroComponent },
  { path: "kit-livro/editar/:id", component: EditarKitLivroComponent },
  { path: "kit-livro/editar", redirectTo: "/kit-livro" },
  { path: "livro", component: LivroComponent },
  { path: "serie", component: SerieComponent },
  { path: "serie/cadastrar", component: CadastrarSerieComponent },
  { path: "serie/editar/:id", component: EditarSerieComponent },
  { path: "serie/editar", redirectTo: "/serie" },
  { path: "turma", component: TurmaComponent },
  { path: "turma/cadastrar", component: CadastrarTurmaComponent },
  { path: "turma/editar/:id", component: EditarTurmaComponent },
  { path: "turma/editar/", redirectTo: "/turma" },
];
