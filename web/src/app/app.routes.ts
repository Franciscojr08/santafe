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
import {
  CadastrarKitLivroComponent
} from "./pages/kit-livro/cadastrar/cadastrar-kit-livro/cadastrar-kit-livro.component";
import {EditarKitLivroComponent} from "./pages/kit-livro/editar-kit-livro/editar-kit-livro.component";

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
  { path: "turma", component: TurmaComponent },
];
