import { Component, OnInit } from '@angular/core';


import { MidiaService } from '../../services/midia'; 

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-midias',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule    
  ],
  templateUrl: './lista-midias.html',
  styleUrl: './lista-midias.css',
})
export class ListaMidias implements OnInit {

  listaDeVideos = new MatTableDataSource<any>([]);
  
  colunasExibidas: string[] = ['nome', 'tipo', 'duracao', 'acoes']; 

  constructor(private midiaService: MidiaService) { }

  ngOnInit(): void {
    this.buscarMidias();
  }

  buscarMidias(): void {
    this.midiaService.listarMidias().subscribe({
      next: (response: any[]) => { 
        this.listaDeVideos.data = response;
      },
      error: (error: any) => { 
        console.error('Erro ao buscar mídias:', error);
      }
    });
  }

  excluirVideo(id: number): void {
    console.log('🚨 Pedido para excluir o vídeo ID:', id);
    alert('Função de excluir o vídeo #' + id + ' foi acionada!');
  }
}