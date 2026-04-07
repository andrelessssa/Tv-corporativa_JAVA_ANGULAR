import { Routes } from '@angular/router';
import { ListaMidias } from './components/lista-midias/lista-midias';
import { CadastroMidia } from './components/cadastro-midia/cadastro-midia';

export const routes: Routes = [
  { path: '', redirectTo: 'grade', pathMatch: 'full' }, // 🏠 Se abrir o site vazio, vai pra grade
  { path: 'grade', component: ListaMidias },           // 📺 Tela da Tabela
  { path: 'novo', component: CadastroMidia }           // ➕ Tela do Formulário
];