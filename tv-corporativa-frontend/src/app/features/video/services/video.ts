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

  // 🔥 URL base única alinhada com a nova porta 8080 do Docker Compose
  private API = 'http://192.168.1.148:8080/api/midias';

  constructor(private http: HttpClient) { }

  // 📥 LISTAR MÍDIAS
  listar(): Observable<MidiaDTO[]> {
    return this.http.get<MidiaDTO[]>(this.API);
  }

  // 📤 UPLOAD DE VÍDEO (Corrigido o retorno para MidiaDTO)
  salvar(formData: FormData): Observable<MidiaDTO> {
    return this.http.post<MidiaDTO>(`${this.API}/upload`, formData);
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