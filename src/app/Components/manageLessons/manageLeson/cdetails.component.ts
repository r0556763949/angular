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
import { CreateLessonComponent } from '../create-lesson/create-lesson.component';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonsComponent } from '../edit-lessons/edit-lessons.component'
import { ErrorDialogComponent } from '../../alerts/error-dialog-component/error-dialog-component.component';
import { SuccessDialogComponent } from '../../alerts/success-dialog/success-dialog.component';
import { NumberPrefixPipe } from '../../pipes/number-prefix.pipe';


@Component({
  selector: 'app-manage-lesson',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    NumberPrefixPipe
  ],
  templateUrl: './cdetails.component.html',
  styleUrl: './cdetails.component.css'
})
export class ManageLessonComponent{
  hover: boolean = false;
  courseId!: string; 
  lessons$!: Observable<any[]>; 

  constructor(private coursesService:CoursesService,private lessonService: LessonsService,  private route: ActivatedRoute,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];})
    this.loadLessons(); 
  }
  
editLesson(id: string) {
    const dialogRef = this.dialog.open(EditLessonsComponent, {
      data: { lessonId: id, courseId: this.courseId } 
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadLessons(); 
      }
    });
  }


addLesson() {
  const dialogRef = this.dialog.open(CreateLessonComponent, {
    data: { courseId: this.courseId } 
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      this.loadLessons();
    }
  });
}
deleteLesson(lessonId: string) {
  console.log('Deleting lesson with id:', lessonId);
  this.lessonService.deleteLesson(this.courseId, lessonId).subscribe(
    response => {
      this.dialog.open(SuccessDialogComponent, {
        data: { message: "Lesson deleted successfully" }
      });
      this.loadLessons(); 
    },
    error => {
      this.dialog.open(ErrorDialogComponent, {
        data: { message:  error.message }
      });
    }
  );
}

loadLessons(): void {
  this.lessons$ = this.lessonService.getLessons(this.courseId).pipe(
    catchError(error => {
      this.dialog.open(ErrorDialogComponent, {
        data: { message:  "Error loading lessons: "+ error }
      });
      return of([]); 
    })
  );


  this.lessons$.subscribe(
    lessons => {
    },
    error => {
      this.dialog.open(ErrorDialogComponent, {
        data: { message:  "Error in subscription: "+ error }
      });
    }
  );
}

}
