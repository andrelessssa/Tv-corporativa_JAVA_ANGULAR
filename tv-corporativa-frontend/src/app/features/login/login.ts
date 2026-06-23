import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html', 
  styleUrls: ['./login.scss']  
})
export class LoginComponent {
  usuario: string = '';
  senha:  String = '';

  constructor(private router: Router) {}

fazerLogin() {
  if (this.usuario === 'admin' && this.senha === 'arsal@123') {
    localStorage.setItem('perfilUser', 'ADMIN');
    this.router.navigate(['/videos']); // 👈 Alterado de 'gestao' para 'videos'!
  } 
  else if (this.usuario === 'tv' && this.senha === 'tv@123') {
    localStorage.setItem('perfilUser', 'TV');
    this.router.navigate(['/tv-loop']);
  } 
  else {
    alert('Credenciais incorretas! 🚫');
  }
 
}}