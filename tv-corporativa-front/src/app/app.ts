import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';


  @Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Dashboard],
  // CONFIRA SE O NOME ABAIXO É EXATAMENTE O QUE ESTÁ NA PASTA:
  templateUrl: './app.html',  // ou './app.component.html'
  styleUrl: './app.css'       // ou './app.component.css'
})
export class AppComponent {
  title = 'tv-corporativa-front';
}