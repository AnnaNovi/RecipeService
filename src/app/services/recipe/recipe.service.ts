import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

import {
  recipeResponse,
  recipeResponseData,
  recipePreview,
} from 'src/app/models';
import { FormatDataService } from '../formatRecipeData/format-recipe-data.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient, private formatData: FormatDataService) {}

  private getRandomRecipeSingle(): Observable<recipeResponse> {
    return this.http.get<any>(`${env.BASE_URL}/random.php`);
  }

  getRandomRecipe(recipeArray: recipePreview[]) {
    this.getRandomRecipeSingle()
      .pipe(
        map((response: recipeResponse): recipePreview => {
          const recipes = response.meals;
          const recipeArray = recipes.map((item: recipeResponseData) => {
            return this.formatData.format(item, 'short');
          });
          return { ...recipeArray[0] };
        })
      )
      .subscribe((recipe: recipePreview) => {
        recipeArray.push(recipe);
      });
  }
}
