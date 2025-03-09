import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Observable } from 'rxjs';
import { AuthState } from '../../../services/auth/auth.reducer';
import { selectAuthState } from '../../../services/auth/auth.actions';
import { ErrorDialogComponent } from '../../alerts/error-dialog-component/error-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../alerts/success-dialog/success-dialog.component';

@Component({
  selector: 'app-create-course',
  imports: [FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,MatCardModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  title: string=''
  description:string=''
  authState$!: Observable<AuthState>;
  teacherId : string=''
  @Output() courseCreated = new EventEmitter<void>();
  constructor(private coursesService: CoursesService, private store: Store<AppState>,private dialog: MatDialog ) {
    this.authState$ = this.store.select(selectAuthState);
    this.authState$.subscribe(authState => {
      if (authState && authState.userId) {
        this.teacherId = authState.userId; 
      } else {
        console.error('User ID is not available in authState');
      }
    });
  }
  

  onSubmit(form: any): void {
    this.courseCreated.emit();
  
    if (this.teacherId) {
      this.coursesService.createCourse(this.title, this.description, Number(this.teacherId)).subscribe(
        response => {
          this.dialog.open(SuccessDialogComponent, {
            data: { message: "Course created successfully" }
          });
        },
        error => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'Error creating course:' + error}
          });
        }
      );
    } else {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: 'Teacher ID is not available'}
      });
    }
  }
  
  }
