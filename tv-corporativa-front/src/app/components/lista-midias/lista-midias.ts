import { Component, OnInit } from '@angular/core';
import { Midia } from '../../services/midia';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-lista-midias',
  imports: [MatTableModule],
  templateUrl: './lista-midias.html',
  styleUrl: './lista-midias.css',
})

export class ListaMidias implements OnInit {

  listaDeVideos = new MatTableDataSource<any>([]);

  colunasExibidas: string[] = ['id', 'nome', 'tipo', 'duracao'];

  constructor(private midiaService: Midia) { }

  ngOnInit(): void {
    this.buscarMidias();
  }

  buscarMidias(): void {
    
    this.midiaService.listarMidias().subscribe({
      next: (response) => {
        this.listaDeVideos.data = response;
      },
      error: (error) => {
        console.error('Erro ao buscar mídias:', error);
      }
    });
  }
}
