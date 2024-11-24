import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../admin/landing/landing.component';
import { UnitsComponent } from './units/units.component';
import { CategoriesComponent } from './categories/categories.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeIngredientsComponent } from './recipe-ingredients/recipe-ingredients.component';

const routes: Routes = [
  {
    path:"", component: LandingComponent, children: [      
      { path: "units", component: UnitsComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "ingredients", component: IngredientsComponent },
      { path: "recipes", component: RecipesComponent },
      {path: "recipeingredients/:recipeId", component:RecipeIngredientsComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
