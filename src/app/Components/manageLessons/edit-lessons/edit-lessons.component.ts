import { Component, Inject } from '@angular/core';
import { LessonsService } from '../../../services/lessons.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SuccessDialogComponent } from '../../alerts/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../alerts/error-dialog-component/error-dialog-component.component';

@Component({
  selector: 'app-edit-lessons',
  imports: [FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,MatCardModule],
  templateUrl: './edit-lessons.component.html',
  styleUrl: './edit-lessons.component.css'
})
export class EditLessonsComponent {
  title: string = '';
  content: string = '';
  constructor(private dialog: MatDialog,
    private lessonService: LessonsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditLessonsComponent>
  ) {
    this.loadLesson();
  }

  loadLesson(): void {
    this.lessonService.getLessonById(this.data.courseId, this.data.lessonId).subscribe(
      lesson => {
        this.title = lesson.title;
        this.content = lesson.content;
      },
      error => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message:  'Error loading lesson: '+ error}
        });
      }
    );
  }
  onSubmit(form: any): void {
    const updates = { title: this.title, content: this.content ,courseId: this.data.courseId };
    this.lessonService.updateLesson(this.data.courseId, this.data.lessonId, updates).subscribe(
      response => {        
        const successDialogRef = this.dialog.open(SuccessDialogComponent, {
        data: { message: "Lesson updated successfully" }
        
      });
      successDialogRef.afterClosed().subscribe(() => {
        this.dialogRef.close(true);
      });
    },
    error => {
      const errorDialogRef = this.dialog.open(ErrorDialogComponent, {
        data: { message: 'Error updating lesson: ' + error }
      });

      errorDialogRef.afterClosed().subscribe(() => {
        this.dialogRef.close(); 
      });}
    );
  }
  }

