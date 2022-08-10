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
  private ingredientsList$: BehaviorSubject<ingredients[] | null> =
    new BehaviorSubject<ingredients[] | null>(null);

  constructor(private http: HttpClient) {}

  public getIngredients$(): BehaviorSubject<ingredients[] | null> {
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

  private getIngredientsAPI$(): Observable<ingredientsNamesResponse> {
    return this.http.get<ingredientsNamesResponse>(
      `${env.BASE_URL}/list.php?i=list`
    );
  }
}
