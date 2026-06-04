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
  exibirFormulario: boolean = false; 
  midiaSelecionada: MidiaDTO | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.carregarMidias();
  }

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

  excluirVideo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este vídeo?')) {
      this.videoService.excluirVideo(id).subscribe({
        next: () => {
          console.log('Vídeo excluído com sucesso! 🗑️');
          this.carregarMidias();
        },
        error: (err) => console.error('Erro ao excluir vídeo:', err)
      });
    }
  }

  prepararEdicao(midia: MidiaDTO): void {
    this.midiaSelecionada = { ...midia };
    this.exibirFormulario = true;
    console.log('Preparando edição para:', this.midiaSelecionada);
  }

  // 
  salvarEdicao(nome: string, url: string, duracao: any): void {
    if (this.midiaSelecionada?.id) {
      const midiaAtualizada: MidiaDTO = {
        id: this.midiaSelecionada.id, // Mantém o ID original do banco 🆔
        nome: nome,
        url: url,
        duracaoSegundos: Number(duracao)
      };

      this.videoService.editarMidia(this.midiaSelecionada.id, midiaAtualizada).subscribe({
        next: () => {
          console.log('Mídia editada no Postgres! ✏️🎯');
          this.exibirFormulario = false; // Fecha o modal
          this.midiaSelecionada = null;  // Limpa a memória
          this.carregarMidias();         // Atualiza a tela
        },
        error: (err) => console.error('Erro ao editar:', err)
      });
    }
  }
}