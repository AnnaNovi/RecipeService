import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  repeat,
  toArray,
  BehaviorSubject,
  take,
  from,
  mergeMap,
  switchMap,
} from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

import {
  recipeResponse,
  recipeResponseData,
  recipePreview,
  recipe,
  recipeByCategoryResponse,
  recipeByCategoryResponseData,
} from 'src/app/models';
import { FormatDataService } from '../formatRecipeData/format-recipe-data.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesPreviewList: BehaviorSubject<any> = new BehaviorSubject([]);
  private recipesSimilarList: BehaviorSubject<any> = new BehaviorSubject([]);

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
  private getRecipeByCategoryAPI(
    category: string | null
  ): Observable<recipeByCategoryResponse> {
    return this.http.get<any>(`${env.BASE_URL}/filter.php?c=${category}`);
  }

  private getRandomRecipe(): Observable<recipePreview> {
    return this.getRandomRecipeAPI().pipe(
      switchMap((response: recipeResponse): Observable<recipeResponseData> => {
        return from(response.meals);
      }),
      map((recipe: recipeResponseData) => {
        return this.formatData.formatShort(recipe);
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
      map((recipe: recipeResponseData) => {
        return this.formatData.formatFull(recipe);
      })
    );
  }

  getSimilarRecipesList(
    quantity: number,
    category: string
  ): BehaviorSubject<recipe[]> {
    if (!this.recipesSimilarList.getValue().length) {
      this.getRecipeByCategoryAPI(category)
        .pipe(
          map((response: recipeByCategoryResponse): any => {
            return from(response.meals)
              .pipe(
                take(quantity),
                mergeMap(
                  (
                    recipe: recipeByCategoryResponseData
                  ): Observable<recipe> => {
                    return this.getRecipeById(recipe.idMeal);
                  }
                ),
                toArray()
              )
              .subscribe((recipe: recipe[]) =>
                this.recipesSimilarList.next(recipe)
              );
          })
        )
        .subscribe();
    }
    return this.recipesSimilarList;
  }
}
