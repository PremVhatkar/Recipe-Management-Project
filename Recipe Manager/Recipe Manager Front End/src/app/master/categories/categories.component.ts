import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  result: any;
  formdata: any;

  constructor(private api: ApiService) { }


  ngOnInit(): void {

    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required]))
    })


    this.api.get("categories").subscribe((result) => {
      this.result = result;
    })
  }


  submit(data: any) {
    if (data.id == 0) {
      this.api.post("categories", data).subscribe((result) => {
        this.bind();
        this.api.success('Data Added Successfully.....');

      });
    }
    else {
      this.api.put("categories/" + data.id, data).subscribe((result) => {
        this.bind();
        this.api.success('Data Updated Successfully.....');

      });
    }
  }

  cancel() {
    this.formdata.reset();

  }


  delete(id: number) {
    if (confirm("Sure to delete?")) {
      this.api.delete("categories/" + id).subscribe((result) => {
        this.bind();
        this.api.success('Data Remove Successfully.....');

      })
    }
  }

  edit(id: number) {
    this.api.get("categories/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name

      });
    })
  }


}
