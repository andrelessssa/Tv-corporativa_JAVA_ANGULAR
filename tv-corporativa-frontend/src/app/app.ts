import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Dashboard } from './features/dashboard/dashboard'; 
import { Video } from './features/video/video';
import { Dispositivos } from './features/dispositivos/dispositivos';
import { Midia } from './components/midia/midia';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [
    RouterModule,
    RouterOutlet, 
    Sidebar, 
    Dashboard,
    Video,
    Dispositivos,
    Midia], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'tv-arsal-front';
}