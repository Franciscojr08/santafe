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

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "cliente", component: ClienteComponent },
  { path: "aluno", component: AlunoComponent },
  { path: "pedido", component: PedidoComponent },
  { path: "pendencia", component: PendenciaComponent },
  { path: "kit-livro", component: KitLivroComponent },
  { path: "livro", component: LivroComponent },
  { path: "serie", component: SerieComponent },
  { path: "turma", component: TurmaComponent },
];
