import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  units: any;
  result: any;
  formdata: any;

  constructor(private api: ApiService) { }


  ngOnInit(): void {
    this.api.get("units").subscribe((result: any) => {
      this.units = result;
    });
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      unitId: new FormControl("", Validators.compose([Validators.required])),
      rate: new FormControl("", Validators.compose([Validators.required])),
      imagePath: new FormControl("")
    })


    this.api.get("ingredients").subscribe((result) => {
      this.result = result;
    })
  }


  submit(data: any) {
    if (data.id == 0) {
      this.api.post("ingredients", data).subscribe((result) => {
        this.bind();
        this.api.success('Data Added Successfully.....');

      });
    }
    else {
      this.api.put("ingredients/" + data.id, data).subscribe((result) => {
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
      this.api.delete("ingredients/" + id).subscribe((result) => {
        this.bind();
        this.api.success('Data Remove Successfully.....');

      })
    }
  }

  edit(id: number) {
    this.api.get("ingredients/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        unitId: result.unitId,
        rate: result.rate,
        imagePath: result.imagePath,
        
      });

    })
  }

}
