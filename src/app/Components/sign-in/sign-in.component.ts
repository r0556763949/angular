import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  useremail=""
  password=""
  onSubmit(form:any) {
    console.log(form);
    console.log(`${this.useremail} ${this.password}`);
  }
}
