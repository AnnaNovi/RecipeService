import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from 'src/environments/environment';

import {
  ingredients,
  ingredientsNamesResponse,
  ingredientsNamesResponseData,
} from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private ingredientsList$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  private getIngredientsAPI$(): Observable<ingredientsNamesResponse> {
    return this.http.get<any>(`${env.BASE_URL}/list.php?i=list`);
  }

  getIngredients$(): BehaviorSubject<ingredientsNamesResponseData[]> {
    if (!this.ingredientsList$.getValue()) {
      this.getIngredientsAPI$()
        .pipe(
          map((response: ingredientsNamesResponse): ingredients[] =>
            response.meals.map((ingredient: ingredientsNamesResponseData) => {
              return {
                id: ingredient.idIngredient,
                title: ingredient.strIngredient,
                description: ingredient.strDescription
                  ? ingredient.strDescription
                  : null,
              };
            })
          )
        )
        .subscribe((ingredients: ingredients[]) => {
          this.ingredientsList$.next(ingredients);
        });
    }
    return this.ingredientsList$;
  }
}
