import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MidiaDTO {
  id?: number;
  nome: string;
  url: string;
  duracaoSegundos: number;
  dataUpload?: string | Date;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  // 🔥 URL base única e correta da API
  private API = 'http://192.168.1.157:8085/api/midias';

  constructor(private http: HttpClient) {}

  // 📥 LISTAR MÍDIAS
  listar(): Observable<MidiaDTO[]> {
    return this.http.get<MidiaDTO[]>(this.API);
  }

  // 📤 UPLOAD DE VÍDEO
  salvar(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/upload`, formData);
  }

  // 🗑️ DELETAR VÍDEO
  excluirVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  // 📊 TOTAL DE MÍDIAS
  buscarTotalMidias(): Observable<number> {
    return this.http.get<number>(`${this.API}/total`);
  }

  // ✏️ EDITAR MÍDIA
  editarMidia(id: number, midia: MidiaDTO): Observable<void> {
    return this.http.put<void>(`${this.API}/${id}`, midia);
  }
}