import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData: any;
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {
    sessionStorage.clear();
  }
  
  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      // this.service.proceedRegister(this.loginForm.value).subscribe(res => {
      //   this.toastr.success('Logged in Successfully...!');
      //   console.log(res);
      //   this.router.navigate(['/user']);
        
      // });

    // } else {
    //   this.toastr.warning('Please Enter Valid Data..!');
    this.service.getByCode(this.loginForm.value.userName).subscribe(res => {
      this.userData = res;
      console.log(this.userData);
      if(this.userData.password === this.loginForm.value.password) {
        if(this.userData.isActive) {
          sessionStorage.setItem('userName',this.userData.id);
          sessionStorage.setItem('userName',this.userData.id);
          this.router.navigate(['']);
        } else {
          this.toastr.error('Please contact admin', 'In Active User');
        }
      } else {
        this.toastr.error('Invalid credentials');
      }
      
    })
    }
  }
}
