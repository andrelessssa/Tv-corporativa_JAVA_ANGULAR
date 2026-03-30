import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaMidias } from './components/lista-midias/lista-midias';

// Importações do Angular Material 📦
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true, // Garante que o componente se vira sozinho
  imports: [
    RouterOutlet,
    ListaMidias,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tv-corporativa-front');
}