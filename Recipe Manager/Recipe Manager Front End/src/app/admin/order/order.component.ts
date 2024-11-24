import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  id:any = 0;
  categoryid: any = 0;
  categories: any;
  allRecipes: any;
  totalAmount = 0;
  billTotalAmount = 0;
  formdata: any;
  orders: any;

  constructor(private api: ApiService, private router: Router, private route:ActivatedRoute) {
    this.id = route.snapshot.paramMap.get("id") || 0;
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      oDate: new FormControl(""),
      eDate: new FormControl(""),
      eventTime: new FormControl(""),
      occasion: new FormControl(""),
      noOfPerson: new FormControl(0),
      name: new FormControl(""),
      address: new FormControl(""),
      email: new FormControl(""),
      mobileNo: new FormControl(""),
      amount: new FormControl(0),
      billAmount: new FormControl(0),
      userId: new FormControl(23),
      status: new FormControl("new"),
    });
    this.api.get("recipes").subscribe((result: any) => {
      this.allRecipes = result.map((recipe: any) => {
        recipe.amount = 0;
        recipe.billAmount = 0;
        recipe.orderRecipeIngredients = null;
        return recipe;
      });

      if(this.id != 0){
        this.api.get("orders/"+this.id).subscribe((result: any) => {
          console.log(result);
          this.formdata.patchValue({
            id:this.id,
            name:result.name,
            mobileNo:result.mobileNo,
            oDate:result.odate,
            eDate:result.edate,
            address:result.address,
            noOfPerson:result.noOfPerson,
            amount:result.amount,
            billAount:result.billAmount
          });
  
         for(let i = 0; i < this.allRecipes.length; i++){
          for(let j = 0; j < result.orderRecipes.length; j++){
            if(result.orderRecipes[j].recipeId == this.allRecipes[i].id){ 
              this.allRecipes[i].amount = result.orderRecipes[j].amount;
              this.allRecipes[i].billAmount = result.orderRecipes[j].billAmount;
              this.allRecipes[i].orderRecipeIngredients = result.orderRecipes[j].orderRecipeIngredients;
            }
          }
         }
          
        });
      }
      
      this.calculateTotal();
    });

    

  }

  recipeChecked(event: Event, recipeId: number) {
    let checkbox = event.target as HTMLInputElement;
    let quantity = this.formdata.controls.noOfPerson.value;
    if (checkbox.checked) {
      //Call API
      this.api.post("orders/calculateAmount/" + quantity + "/" + recipeId, null).subscribe((result: any) => {
        this.allRecipes = this.allRecipes.map((recipe: any) => {
          if (recipe.id == recipeId) {
            recipe.amount = result.amount;
            recipe.billAmount = 0;
            recipe.orderRecipeIngredients = result.orderRecipeIngredients.filter((ori: any) => {
              return { id: 0, orderRecipeId: 0, ingredientId: ori.ingredientId, quantity: ori.quantity, rate: ori.rate };
            });
          }
          return recipe;
        });
        this.calculateTotal();
      });
    }
    else {
      //set Amount and Bill Amount to 0
      this.allRecipes = this.allRecipes.map((recipe: any) => {
        if (recipe.id == recipeId) {
          recipe.amount = 0;
          recipe.billAmount = 0;
          recipe.orderRecipeIngredient = null;
        }
        return recipe;
      });
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalAmount = 0;
    this.billTotalAmount = 0;
    for (let i = 0; i < this.allRecipes.length; i++) {
      let recipe = this.allRecipes[i];
      this.totalAmount += parseFloat(recipe.amount);
      this.billTotalAmount += parseFloat(recipe.billAmount);
    }
  }

  billAmountChanged(event: Event, recipeId: number) {
    this.calculateTotal();
    console.log(this.allRecipes);

  }

  submit(data: any) {
    let orderRecipes = new Array();
    for (let i = 0; i < this.allRecipes.length; i++) {
      let recipe = this.allRecipes[i];
      if (recipe.amount > 0) {
        let obj = { id: 0, orderId: 0, recipeId: recipe.id, amount: recipe.amount, billAmount: recipe.billAmount, orderRecipeIngredients: recipe.orderRecipeIngredients };

        orderRecipes.push(obj);
      }
    }
    let rdata = { ...data, amount: this.totalAmount, billAmount: this.billTotalAmount, orderRecipes: orderRecipes };
    if(this.id == 0){
      this.api.post("orders", rdata).subscribe((result) => {
        this.orders = result;
        this.api.success('Data Added Successfully.......')
        this.router.navigate(['/admin/orders']);
      });
    }
    else{
      this.api.put("orders/" + this.id, rdata).subscribe((result) => {
        this.orders = result;
        this.api.success('Data updated Successfully.......')
        this.router.navigate(['/admin/orders']);
      });
    }

  }

}
