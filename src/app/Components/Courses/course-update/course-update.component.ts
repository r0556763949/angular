import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorDialogComponent } from '../../alerts/error-dialog-component/error-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../alerts/success-dialog/success-dialog.component';

@Component({
  selector: 'app-course-update',
  imports: [FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule, MatCardModule],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent {
  title: string = ''
  description: string = ''
  @Input() input: any;
  @Output() afterSubmit = new EventEmitter<void>();
  constructor(private courseService: CoursesService,private dialog: MatDialog) { }
  ngOnInit(): void {
    if (this.input) {
      this.courseService.getCourseById(this.input).subscribe(
        course => {
          this.title = course.title;
          this.description = course.description;
        },
        error => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'Error loading course details: ' +  error }
          });
        }
      );
    }
  }
  onSubmit(form: any): void {
    const updates = { title: this.title, description: this.description, teacherId: 2 }
    this.updateCourse(this.input, updates)
    this.courseService.getAllCourses();
    this.afterSubmit.emit();
  }
  updateCourse(id: string, updates: any) {
    this.courseService.updateCourse(id, updates).subscribe(
      response => {
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          data: { message: "updating successfully" }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.courseService.getAllCourses();
          this.afterSubmit.emit(); 
        });
      },
      error => {
        const errorMessage = error.error?.message || 'Error updating course';
        this.dialog.open(ErrorDialogComponent, {
          data: { message: 'Error updating course: ' +  errorMessage}
        });
      }
    );
  }
}
