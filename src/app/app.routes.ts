import { Routes } from '@angular/router';
import { CoursesPageComponent } from './Components/Courses/courses-page/courses-page.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { PageComponent } from './Components/CForStudents/page/page.component';
import { CDetailsComponent } from './Components/CForStudents/cdetails/cdetails.component';
import { MainComponent } from './main/main.component';
import { ManageLessonComponent } from './Components/manageLessons/manageLeson/cdetails.component';
export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'courses', component: CoursesPageComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {path: 'myCourses', component: PageComponent },
    {path: 'myCourses/Courses-lesson/:id', component: CDetailsComponent},
    {path: 'courses/Courses-lesson/:id', component: ManageLessonComponent},
    
];
