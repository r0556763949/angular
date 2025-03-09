import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesService } from '../../../services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { AuthState } from '../../../services/auth/auth.reducer';
import { selectAuthState } from '../../../services/auth/auth.selectors';
import {  Router } from '@angular/router';
import { CDetailsComponent } from '../cdetails/cdetails.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../alerts/error-dialog-component/error-dialog-component.component';
import { SuccessDialogComponent } from '../../alerts/success-dialog/success-dialog.component';

@Component({
  selector: 'app-list',
  imports: [MatButtonModule,MatCardModule,MatIconModule,CommonModule,CDetailsComponent,MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  courses$!: Observable<any[]>;
  authState$!: Observable<AuthState>;
  constructor(private coursesService: CoursesService ,private store:Store<AppState>,private router: Router,private dialog: MatDialog) {
    this.authState$ = this.store.select(selectAuthState)
   }
  ngOnInit(): void {
    this.courses$ = this.coursesService.courses$; 
    this.loadCourses();
  }
  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe(
      (response) => {
      },
      (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: 'Error fetching courses: ' + error}
      });}
    );
}
viewCourseDetails(id: string): void {
  this.router.navigate(['myCourses/Courses-lesson', id]);
}
Leave(id: string) {
  this.authState$.subscribe(authState => {
    if (authState && authState.userId) {
      this.coursesService.leaveCourse(id, Number(authState.userId)).subscribe({
        next: (response) => {
          this.dialog.open(SuccessDialogComponent, {
            data: { message: 'Student left the course successfully'}
          });
        },
        error: (error) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'Error leaving course: '+error}
          });
        }
      });
    } else {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: 'User not authenticated or userId not found' }
      });
    }
  });
}

Join(id: string) {
  this.authState$.subscribe(authState => {
    if (authState && authState.userId) {
      this.coursesService.enrollStudentInCourse(id, Number(authState.userId)).subscribe({
        next: (response) => {
          this.dialog.open(SuccessDialogComponent, {
            data: { message: 'Student enrolled successfully' }
          });
        },
        error: (error) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'Error enrolling student (maybe you already join) '  }
          });
        }
      });
    } else {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: 'User not authenticated or userId not found' }
      });
    }
  });
}
}
