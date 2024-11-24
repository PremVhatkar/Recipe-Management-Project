import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { UnitsComponent } from './units/units.component';
import { CategoriesComponent } from './categories/categories.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeIngredientsComponent } from './recipe-ingredients/recipe-ingredients.component';


@NgModule({
  declarations: [
    UnitsComponent,
    CategoriesComponent,
    IngredientsComponent,
    RecipesComponent,
    RecipeIngredientsComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MasterModule { }
