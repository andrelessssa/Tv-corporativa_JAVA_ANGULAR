import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root' 
})
export class MidiaService {

  
  private readonly API = 'http://localhost:8080/api/videos';

  constructor(private http: HttpClient) { }

  
  listarTodos(): Observable<any[]> {
    
    return this.http.get<any[]>(this.API);
  }
}