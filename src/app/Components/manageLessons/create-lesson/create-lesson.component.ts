import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LessonsService } from '../../../services/lessons.service';
import { catchError, of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../alerts/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../alerts/error-dialog-component/error-dialog-component.component';

@Component({
  selector: 'app-create-lesson',
  imports: [FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,MatCardModule],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.css'
})
export class CreateLessonComponent {
 courseId!: string; 
  title: string=''
  content:string=''
  constructor(private dialog: MatDialog,
    private lessonService: LessonsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateLessonComponent> // הוסף את MatDialogRef
  ) {
    this.courseId = data.courseId; // קבלת ה-courseId מהדיאלוג
  }
  onSubmit(form: any): void {
    console.log("form submit");
    this.lessonService.createLesson(this.courseId, this.title, this.content)
      .pipe(
        catchError(error => {
          const errorDialogRef = this.dialog.open(ErrorDialogComponent, {
            data: { message: 'Error creating lesson: ' + error }
          });

          errorDialogRef.afterClosed().subscribe(() => {
            this.dialogRef.close(); 
          });

          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          const successDialogRef = this.dialog.open(SuccessDialogComponent, {
            data: { message: "Lesson created successfully" }
          });

          successDialogRef.afterClosed().subscribe(() => {
            this.dialogRef.close(true); // סוגר את דיאלוג יצירת השיעור
          });
        }
      });
  }
}
