import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Midia {

  private readonly API = 'http://localhost:8080/api/midias';

  constructor( private http: HttpClient  ) { }

  listarMidias() : Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }
  
}
