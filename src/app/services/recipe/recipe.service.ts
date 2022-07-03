import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, repeat, toArray, isEmpty, BehaviorSubject, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

import {
  recipeResponse,
  recipeResponseData,
  recipePreview,
  recipe,
} from 'src/app/models';
import { FormatDataService } from '../formatRecipeData/format-recipe-data.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesPreviewList: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private formatData: FormatDataService
  ) {}

  private getRandomRecipeAPI(): Observable<recipeResponse> {
    return this.http.get<any>(`${env.BASE_URL}/random.php`);
  }
  private getRecipeByIdAPI(id: string | null): Observable<recipeResponse> {
    return this.http.get<any>(`${env.BASE_URL}/lookup.php?i=${id}`);
  }

  private getRandomRecipe(): Observable<recipePreview> {
    return this.getRandomRecipeAPI().pipe(
      map((response: recipeResponse): recipePreview => {
        const recipes = response.meals;
        const recipeArray = recipes.map((item: recipeResponseData) => {
          return this.formatData.formatShort(item);
        });
        return { ...recipeArray[0] };
      })
    );
  }

  getRandomRecipesList(quantity: number): BehaviorSubject<recipePreview[]> {
    if (!this.recipesPreviewList.getValue().length) {
      this.getRandomRecipe()
        .pipe(repeat(quantity), toArray())
        .subscribe((recipe: recipePreview[]) => {
          this.recipesPreviewList.next(recipe);
        });
    }
    return this.recipesPreviewList;
  }

  getRecipeById(id: string | null): Observable<recipe> {
    return this.getRecipeByIdAPI(id).pipe(
      map((response: recipeResponse): recipeResponseData => {
        return response.meals[0];
      }),
      map((recipeArray: recipeResponseData) => {
        return this.formatData.formatFull(recipeArray);
      })
    );
  }
}
