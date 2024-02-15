import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageLoginService } from './services/localstorage/localstorage-login.service';
import { ToastsContainer } from './components/toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink,
    ToastsContainer
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finday-web-app';

  constructor(
    private router: Router,
    private localStorageLoginService: LocalStorageLoginService) {}

  logout() {
    this.localStorageLoginService.cleanUserLocalData();
    this.router.navigate(['/login']);
  }
}
