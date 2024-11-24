import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {


  categories: any;
  result: any;
  formdata: any;

  constructor(private api: ApiService, private router: Router) { }


  ngOnInit(): void {

    this.api.get("categories").subscribe((result: any) => {
      this.categories = result;
      console.log(this.categories);

    });

    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      categoryId: new FormControl("", Validators.compose([Validators.required])),
      name: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("", Validators.compose([Validators.required])),
      noOfPerson: new FormControl("", Validators.compose([Validators.required]))
    })


    this.api.get("recipes").subscribe((result) => {
      this.result = result;
    })
  }


  submit(data: any) {
    if (data.id == 0) {
      this.api.post("recipes", data).subscribe((result) => {
        this.bind();
        this.api.success('Data Added Successfully.....');

      });
    }
    else {
      this.api.put("recipes/" + data.id, data).subscribe((result) => {
        this.bind();
        this.api.success('Data Edit Successfully.....');

      });
    }
  }

  cancel() {
    this.formdata.reset();

  }


  delete(id: number) {
    if (confirm("Sure to delete?")) {
      this.api.delete("recipes/" + id).subscribe((result) => {
        this.bind();
        this.api.success('Data Remove Successfully.....');

      })
    }
  }

  edit(id: number) {
    this.api.get("recipes/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        categoryId: result.categoryId,
        name: result.name,
        description: result.description,
        noOfPerson: result.noOfPerson,
      });

    })
  }

}
