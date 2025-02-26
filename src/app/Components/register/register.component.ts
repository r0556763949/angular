import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  useremail=""
  password=""
  name=""
  role=""
  
 onSubmit(form:any) {
  console.log(form);
  console.log(`${this.name}`);
}
}
