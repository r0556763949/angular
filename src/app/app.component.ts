import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { Store, StoreModule } from '@ngrx/store';
import { AuthState, authReducer } from './services/auth/auth.reducer';
import { LoginComponent } from './Components/login/login.component';
import { Observable, map } from 'rxjs';
import { AppState } from './app.state';
import { selectAuthState } from './services/auth/auth.selectors';
import { AuthService } from './services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MainComponent } from './main/main.component';
//import { MatAvatarModule } from '@angular/material/avatar';

@Component({
  selector: 'app-root',
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
    MainComponent,
    // MatAvatarModule,
    RegisterComponent,
    MatButtonModule,
    LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
  ngOnInit(): void {
}
}
