import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private baseUrl = 'http://localhost:3000/api/courses'; // החלף ב-URL של ה-API שלך

  constructor(private http: HttpClient) { }

  // Get all lessons in a course
  getLessons(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons`); // כולל courseId ב-URL
  }

  // Get lesson by ID
  getLessonById(courseId: string, lessonId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons/${lessonId}`);
  }

  // Create new lesson
  createLesson(courseId: string, title: string, content: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/lessons`, { title, content });
  }

  // Update lesson by ID
  updateLesson(courseId: string, lessonId: string, updates: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, updates);
  }

  // Delete lesson by ID
  deleteLesson(courseId: string, lessonId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/lessons/${lessonId}`);
  }
}
