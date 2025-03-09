import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { register, registerSuccess, registerFailure } from '../../services/auth/auth.actions';
import { AppState } from '../../app.state';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service'; // ייבוא של AuthService
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../alerts/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../alerts/error-dialog-component/error-dialog-component.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule ,  
      MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatSelectModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private authService: AuthService, private router: Router,private dialog: MatDialog) { 
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log("onsubmit form");
      const { name, email, password, role } = this.registerForm.value;
      this.authService.register(name, email, password, role).subscribe({
        next: (response) => {
          const { token, userId } = response; 
          this.dialog.open(SuccessDialogComponent, {
            data: { message: 'welcome! now login!' }
          });
          this.store.dispatch(registerSuccess({ token, userId, role })); 
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'Registration error '  }
          });
          this.store.dispatch(registerFailure({ error: error.message }));
        }
      });
    }
  }

}

