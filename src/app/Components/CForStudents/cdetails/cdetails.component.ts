import { Component, Input, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { LessonsService } from '../../../services/lessons.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../../services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../alerts/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../alerts/error-dialog-component/error-dialog-component.component';
import { NumberPrefixPipe } from '../../pipes/number-prefix.pipe';

@Component({
  selector: 'app-cdetails',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,NumberPrefixPipe 
  ],
  templateUrl: './cdetails.component.html',
  styleUrl: './cdetails.component.css'
})
export class CDetailsComponent{
  hover: boolean = false;
 courseId!: string; 
  lessons$!: Observable<any[]>; 
  currentCourse:any={}
  constructor(private coursesService:CoursesService,private lessonService: LessonsService,  private route: ActivatedRoute,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];})
    this.loadLessons(); 
    this.viewCourseDetails(this.courseId)
  }

  viewCourseDetails(id: string): void {
    console.log("cdcourse viewCourseDetails : id: "+id);
    this.coursesService.getCourseById(id).subscribe(
      course => {
        this.currentCourse = course;
        console.log(course);
      },
      error => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message:"  Course not found : "+error}});
      }
    );
  }

loadLessons(): void {
  this.lessons$ = this.lessonService.getLessons(this.courseId).pipe(
    catchError(error => {
      this.dialog.open(ErrorDialogComponent, {
        data: { message:  "Error loading lessons: "+ error }});
      return of([]); 
    })
  );
}

downward(){
  this.dialog.open(SuccessDialogComponent, {
    data: { message: "Downloaded!" }
  });
}
}
