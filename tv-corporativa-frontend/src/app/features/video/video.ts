import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidiaDTO, VideoService } from './services/video';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.html',
  styleUrls: ['./video.scss']
})
export class Video implements OnInit {
  
  listaDeMidias: MidiaDTO[] = [];
  
  // 1. VOCÊ PRECISA DECLARAR ESSA VARIÁVEL AQUI EM CIMA!
  exibirFormulario: boolean = false; 

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.carregarMidias();
  }

  // 2. VOCÊ PRECISA CRIAR A FUNÇÃO QUE O HTML ESTÁ CHAMANDO!
enviarDados(nome: string, url: string, duracao: any) {
  const novaMidia: MidiaDTO = {
    nome: nome,
    url: url,
    duracaoSegundos: Number(duracao)
  };

  this.videoService.salvar(novaMidia).subscribe({
    next: (res) => {
      console.log('Gravado no Postgres com sucesso! 🎯');
      this.exibirFormulario = false;
      this.carregarMidias();
    },
    error: (err) => console.error('Erro ao salvar:', err)
  });
}

  carregarMidias(): void {
    this.videoService.listar().subscribe({
      next: (dados) => this.listaDeMidias = dados,
      error: (err) => console.error(err)
    });
  }

}