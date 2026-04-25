import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Dashboard } from './features/dashboard/dashboard'; 
import { Video } from './features/video/video';
import { Dispositivos } from './features/dispositivos/dispositivos';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [
    RouterModule,
    RouterOutlet, 
    Sidebar, 
    Dashboard,
    Video,
    Dispositivos], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'tv-arsal-front';
}