import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, UrlSegment } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  logindata: any;

  constructor(private router: Router, private toastr: ToastrService, private api: ApiService) { }



  ngOnInit(): void {
    this.logindata = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  login(data: any) {

    this.api.post("authentication/login", data).subscribe((result: any) => {
      if (result.status == "Success") {
        
        let user = {id:result.user.id, name:result.user.name, email:result.user.email};
        localStorage.setItem("user", JSON.stringify(user));

        this.api.success('Login Successfully.....');
        this.router.navigate(['/admin/dashboard']);
      }
      else {
        this.api.error('Invalid Credentials .....');
        this.logindata.reset();
      }
    });




    // if (data.email == "admin" && data.password == "123") {
    //   this.api.success('Login Successfully.....');
    //   // Swal.fire({
    //   //   title: 'Login Succsessfully',
    //   //   icon: 'success'
    //   // })
    //   this.router.navigate(['/admin/dashboard']);
    // }
    // else {
    //   this.api.error('Invalid Credentials .....');
    //   // Swal.fire({
    //   //   title: 'Invalid Credentials',
    //   //   icon: 'error'
    //   // })
    //   this.api.error('Invalid Credentials .....');
    //   this.logindata.reset();
    // }

  }
}

