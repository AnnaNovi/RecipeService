import { Component } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe/recipe.service'; 
import { Observable } from 'rxjs';

import { recipePreview } from 'src/app/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  recipesPreviewList: Observable<recipePreview[]> =
    this.recipeService.getRandomRecipesList(8);

  constructor(private recipeService: RecipeService) {}
}
