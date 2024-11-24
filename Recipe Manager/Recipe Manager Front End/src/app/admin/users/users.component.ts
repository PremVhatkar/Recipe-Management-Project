import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  result: any;
  formdata: any;

  constructor(private api: ApiService) { }


  ngOnInit(): void {

    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      mobileNo: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required])),
      imagePath: new FormControl("")
    })


    this.api.get("users").subscribe((result) => {
      this.result = result;
    })
  }


  submit(data: any) {
    console.log(data);
    
    if (data.id == 0) {
      this.api.post("users", data).subscribe((result) => {
        this.bind();
        console.log(result);

        this.api.success('Data Added Successfully.......')
      });
    }
    else {
      this.api.put("users/" + data.id, data).subscribe((result) => {
        this.bind();
        this.api.success('Data Update Successfully.......')

      });
    }
  }

  cancel() {
    this.formdata.reset();
  }


  delete(id: number) {
    if (confirm("Sure to delete?")) {
      this.api.delete("users/" + id).subscribe((result) => {
        this.bind();
        this.api.success('Data Remove Successfully.......')

      })
    }
  }

  edit(id: number) {
    this.api.get("users/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        email: result.email,
        mobileNo: result.mobileNo,
        password: result.password,
        imagePath: result.imagePath
      });

    })
  }
}
