import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { recipePreview } from 'src/app/models';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
  recipesPreviewList$: BehaviorSubject<recipePreview[]> =
    this.recipeService.getRandomRecipesList(20);

  constructor(private recipeService: RecipeService) {}
}
