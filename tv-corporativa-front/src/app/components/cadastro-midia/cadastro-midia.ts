import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// 👇 Trocamos o Select por ButtonToggle (Estilo Grafana)
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 

@Component({
  selector: 'app-cadastro-midia',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule // 👈 Ativamos aqui!
  ],
  templateUrl: './cadastro-midia.html',
  styleUrl: './cadastro-midia.css'
})
export class CadastroMidia {
  novaMidia = {
    nome: '',
    tipo: 'MP4', // Valor padrão
    url: '',
    duracaoSegundos: 60
  };

  constructor() {}

  salvar() {
    console.log('Salvando mídia estilo Dark:', this.novaMidia);
    // POST em breve!
  }
}