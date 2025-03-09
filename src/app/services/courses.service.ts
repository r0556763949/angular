
import {  Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses'; // כתובת ה-API שלך
  private coursesSubject = new BehaviorSubject<any[]>([]); // הוספת BehaviorSubject
  courses$ = this.coursesSubject.asObservable(); 
  
  constructor(private http: HttpClient) { }
  getAllCourses(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(courses => this.coursesSubject.next(courses)) // עדכון ה-BehaviorSubject
    );
  }

  // Get course by ID
  getCourseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  createCourse(title: string, description: string, teacherId: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { title, description, teacherId }).pipe(
      tap(newCourse => {
        const currentCourses = this.coursesSubject.getValue();
        this.coursesSubject.next([...currentCourses, newCourse]); // עדכון ה-BehaviorSubject
      }),
      switchMap(() => this.getAllCourses()) // רענון הרשימה מהשרת
    );
  }
  

  

  // Update course by ID
  updateCourse(id: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updates).pipe(
      tap(updatedCourse => {
        // עדכן את ה-BehaviorSubject עם הקורס המעודכן
        const currentCourses = this.coursesSubject.getValue().map(course => 
          course.id === id ? { ...course, ...updatedCourse } : course // עדכן את הקורס עם המידע החדש
        );
        this.coursesSubject.next(currentCourses); // עדכון ה-BehaviorSubject
      })
    );
}


  // Delete course by ID
  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentCourses = this.coursesSubject.getValue().filter(course => course.id !== id);
        this.coursesSubject.next(currentCourses); // עדכון ה-BehaviorSubject
      })
    );
  }
    // Add student to course
  enrollStudentInCourse(courseId: string, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${courseId}/enroll`, { userId }).pipe(
      tap(response => {
        console.log(response.message); // הודעת הצלחה או שגיאה
      })
    );
  }
  //leave
  leaveCourse(courseId: string, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${courseId}/leave`, { userId }).pipe(
        tap(response => {
            console.log(response.message); // הודעת הצלחה או שגיאה
        }),
        catchError(error => {
            console.error('Error leaving course:', error);
            return of(null); // החזר Observable ריק במקום לזרוק שגיאה
        })
    );
}



}

