import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      tel: ['']
    });
  }

  onSubmit() {
    const { username, password,name,lastname,email,address,tel } = this.registerForm.value;
    this.authService.register(username, password,name,lastname,email,address,tel);
  }
}
