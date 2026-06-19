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

  salvar(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/upload`, formData);
  }
  excluirVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
    
  }
  goo(): Observable<number> {
    return this.http.get<number>(`${this.API}/total`);
  }
    
  buscarTotalMidias(): Observable<number> {
    return this.http.get<number>(`${this.API}/total`);
  }
  editarMidia(id: number, midia: MidiaDTO): Observable<void> {
    return this.http.put<void>(`${this.API}/${id}`, midia);
  }
}