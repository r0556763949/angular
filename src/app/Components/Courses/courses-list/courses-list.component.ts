import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/courses.service'
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CourseUpdateComponent } from '../course-update/course-update.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../alerts/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../alerts/error-dialog-component/error-dialog-component.component';


@Component({
  selector: 'app-courses-list',
  imports: [MatCardModule,MatIconModule,CourseUpdateComponent,CommonModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent {
  courses$!: Observable<any[]>;
  selectedCourse:any
  selectForDelete : any
  selectForUpdate:any

  constructor(private coursesService: CoursesService, private router: Router,private dialog: MatDialog) { }
  ngOnInit(): void {
    this.courses$ = this.coursesService.courses$;
    this.loadCourses(); 
  }

  changeSelectedCourse(){
    this.selectedCourse = !this.selectedCourse;
  }
  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe(
      (response) => {
      },
      (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: 'Error fetching courses: ' + error}
        });
      }
    );
}

  viewCourseDetails(id: string): void {
    this.coursesService.getCourseById(id).subscribe(
      course => {
        this.selectedCourse = course;
      },
      error => {
        let mes;
        if (error.status === 404) {
          mes = 'Course not found'
        } else if (error.status === 401) {
          mes = 'Unauthorized access'
        } else {
         mes = 'An unexpected error occurred: '+ error;
        }
        this.dialog.open(ErrorDialogComponent, {
          data: { message: mes }
        });
      }
    );
  }

  Delete(id:string){
    this.coursesService.deleteCourse(id).subscribe(
      response => {
        this.dialog.open(SuccessDialogComponent, {
          data: { message: "Course deleted successfully" }
        });
      },
      error => {
        const errorMessage = error.error?.message || 'Error deleting course';
        this.dialog.open(ErrorDialogComponent, {
          data: { message: 'Error deleting course : ' +  errorMessage }
        });
      }
    );
  }
  Update(id:string){
   this.selectForUpdate = id
  }
  updateSubmit(){
  this.loadCourses()
    this.selectForUpdate=null
  }
  ManageLessons(id:string){
    this.router.navigate(['courses/Courses-lesson', id]);
  }
}




