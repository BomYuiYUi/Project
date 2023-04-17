import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  editForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private userService: UserService) { }
  myUser: any={};
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', Validators.required]
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getAuth(token).subscribe({
        next:(res)=>{
          this.myUser = res;
          this.editForm.setValue({
            name: res['name'],
            lastname: res['lastname'],
            email: res['email'],
            address: res['address'],
            tel: res['tel']
            });
            console.log(this.myUser)
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
    const { name,lastname,email,address,tel  } = this.editForm.value;
    this.userService.editProfile(this.myUser.username,name,lastname,email,address,tel).subscribe({
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
