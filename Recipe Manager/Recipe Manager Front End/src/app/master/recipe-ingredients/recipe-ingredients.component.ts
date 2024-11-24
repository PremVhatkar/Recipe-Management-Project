import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.css']
})
export class RecipeIngredientsComponent implements OnInit {

  recipeId: any;
  recipe: any;
  ingredients: any;
  formdata: any;
  listingredients: any;
  unit:any;

  constructor(private api: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get("recipeId") || 0;

    this.api.get("recipes/" + this.recipeId).subscribe((result: any) => {
      this.recipe = result;
    })


    this.api.get("ingredients").subscribe((result) => {
      this.ingredients = result;
    })



    this.bind();
  }


  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      recipeId: new FormControl(this.recipeId, Validators.compose([Validators.required])),
      ingredientId: new FormControl(0, Validators.compose([Validators.required])),
      quantity: new FormControl(0, Validators.compose([Validators.required])),
      unit:new FormControl("")
    });
    this.api.get("recipes/listingredients/" + this.recipeId).subscribe((result: any) => {
      this.listingredients = result;
    })
  }

  ingredientChanged(event:Event){
    this.unit = "";
    this.ingredients.map((ingredient:any)=>{
      if(ingredient.id == this.formdata.controls.ingredientId.value){
        this.unit = ingredient.unit.name;
      }
    });
  }

  submit(data: any) {
    if (data.id == 0) {
      this.api.post("recipes/addingredient", data).subscribe((result) => {
        this.bind();
        this.api.success('Data Added Successfully.....');

      });
    }
    else { 
      this.api.put("recipes/addingredient/" + data.id, data).subscribe((result) => {
        this.bind();
        this.api.success('Data Edit Successfully.....');

      });
    }
  }

  // // edit(result:any) {
  // //     this.formdata.patchValue({
  // //       id: result.id,
  // //       recipeId: result.recipeId,
  // //       ingredientId: result.ingredientId,
  // //       quantity: result.quantity,
  // //       unit:result.unit
  // //   })
  // }


  deletedata(id: number) {
    if (confirm("Sure to delete?")) {
      this.api.delete("recipes/removeingredient/" + id).subscribe((result) => {
        this.bind();
        this.api.success('Data Remove Successfully.....');

      })
    }
  }



  // this.api.post("recipes/addingredient", data).subscribe((result) => {
  // })
  // this.formdata.reset();
  // }

  cancel() {
    this.bind()
  }

}
