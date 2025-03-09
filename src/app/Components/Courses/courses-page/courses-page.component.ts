import { Component } from '@angular/core';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CoursesListComponent,CreateCourseComponent,MatButtonModule],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {
  showCreateCourse!: any;
  constructor(){}
  onCourseCreated(){
    this.showCreateCourse = null; // מסגרים את הטופס לאחר יצירת הקורס
  }
}
