import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  // URL que aponta para o seu Spring Boot na ARSAL
  private readonly API = 'http://localhost:8080/api/videos';

  constructor(private http: HttpClient) { }

  // Função para listar os vídeos (está ligada à tabela do dashboard)
  listarVideos(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }
}