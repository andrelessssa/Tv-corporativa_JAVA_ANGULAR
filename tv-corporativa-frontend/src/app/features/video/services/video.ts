import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface MidiaDTO {
  id?: number;
  nome: string;
  url: string;
  duracaoSegundos: number; // Usaremos no lugar de "Tamanho"
  dataUpload?: string | Date;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  // URL exata da sua Controller Java
 
  private readonly API = 'http://localhost:8080/api/midias';

  constructor(private http: HttpClient) { }

  listar(): Observable<MidiaDTO[]> {
    return this.http.get<MidiaDTO[]>(this.API);
  }

  salvar(midia: MidiaDTO): Observable<MidiaDTO> {
    return this.http.post<MidiaDTO>(this.API, midia);
  }
  excluirVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
    
  }
}