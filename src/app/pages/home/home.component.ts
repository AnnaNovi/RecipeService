import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe/recipe.service'; 
import { BehaviorSubject } from 'rxjs';

import { recipePreview } from 'src/app/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  recipesPreviewList: BehaviorSubject<recipePreview[]> =
    this.recipeService.getRandomRecipesList(8);

  constructor(private recipeService: RecipeService) {}

}
