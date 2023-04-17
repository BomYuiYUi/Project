import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editpassword',
  templateUrl: './editpassword.component.html',
  styleUrls: ['./editpassword.component.css']
})
export class EditpasswordComponent {
  editForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private userService: UserService) { }
  myUser: any={};
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      password: ['', Validators.required],
      newpassword: ['', Validators.required],
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getAuth(token).subscribe({
        next:(res)=>{
          this.myUser = res;
        },
        error:(err)=>{
          console.log(err.error)
        }
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  onSubmit() {
    const { password,newpassword  } = this.editForm.value;
    this.userService.editpassword(this.myUser.username,password,newpassword).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    });
    console.log(name)
    alert('successfully')
  }
}
