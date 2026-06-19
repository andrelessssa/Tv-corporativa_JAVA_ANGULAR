import { Component, inject } from '@angular/core'; // 👈 'inject' importado com sucesso
import { HttpClient } from '@angular/common/http'; // 👈 'HttpClient' importado com sucesso

@Component({
  selector: 'app-midia',
  imports: [],
  templateUrl: './midia.html',
  styleUrl: './midia.scss',
})
export class Midia {

  private http = inject(HttpClient);

  // Linha 1: Cria uma caixinha na memória para segurar o arquivo .mp4
  arquivoSelecionado: File | null = null;

  // Linha 2: Função que é chamada quando o usuário escolhe um arquivo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado = input.files[0];
      console.log('Arquivo selecionado:', this.arquivoSelecionado.name);
    }
  }

  // Linha 3: Função que é chamada quando o usuário clica no botão de envio
  onUpload() {
    if (this.arquivoSelecionado) {
      
      // 1. Criamos a "caixa de papelão" de envio
      const dadosFormulario = new FormData();
      
      // 2. Colocamos o arquivo dentro da caixa com o carimbo 'file'
      dadosFormulario.append('file', this.arquivoSelecionado);

      console.log('Pacote FormData preparado com o vídeo:', this.arquivoSelecionado.name);
      
      // O disparo real em direção ao seu Java da ARSAL
      this.http.post('http://localhost:8080/api/midias/upload', dadosFormulario)
        .subscribe({
          next: (resposta) => {
            console.log('Upload feito com sucesso na ARSAL! 🎉', resposta);
            alert('Vídeo enviado com sucesso!');
          },
          error: (erro) => {
            console.error('Erro ao enviar o vídeo pro Java: ❌', erro);
            alert('Falha no upload.');
          }
        });

    } else {
      console.log('Nenhum arquivo foi selecionado ainda! 🚫');
    }
  }
}