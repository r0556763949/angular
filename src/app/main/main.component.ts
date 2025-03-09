

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../Components/register/register.component';
import { Store, StoreModule } from '@ngrx/store';
import { AuthState, authReducer } from '../services/auth/auth.reducer';
import { LoginComponent } from '../Components/login/login.component';
import { Observable, map } from 'rxjs';
import { AppState } from '../app.state'
import { selectAuthState } from '../services/auth/auth.selectors';
import { AuthService } from '../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    RegisterComponent,
    MatButtonModule,
    LoginComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css'
})
export class MainComponent {
  authState$!: Observable<AuthState>;
   textColor: string = 'rgb(249, 95, 226)';
  constructor(private authservice :AuthService ,private store:Store<AppState>)
  {
    this.authState$ = this.store.select(selectAuthState)
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
}
