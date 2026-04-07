import { Component, signal } from '@angular/core';

import { ListaMidias } from './components/lista-midias/lista-midias';

// Importações do Angular Material 📦
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CadastroMidia } from './components/cadastro-midia/cadastro-midia';

import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule, // 👈 Certifique-se de que ele está nesta lista!
    ListaMidias,
    CadastroMidia,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('tv-corporativa-front');
}