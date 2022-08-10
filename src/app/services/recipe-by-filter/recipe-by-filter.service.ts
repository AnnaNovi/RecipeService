import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeByIdService } from '../recipe-by-id/recipe-by-id.service';

import {
  Observable,
  map,
  toArray,
  BehaviorSubject,
  take,
  from,
  mergeMap,
  skip,
} from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import {
  recipePreview,
  recipe,
  recipeByCategoryResponse,
  recipeByCategoryResponseData,
} from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class RecipeByFilterService {
  public activePage$: BehaviorSubject<number> = new BehaviorSubject(1);
  public totalQuantityOfPages$: BehaviorSubject<number> = new BehaviorSubject(
    1
  );
  private recipesSimilarList$: BehaviorSubject<recipePreview[] | null> =
    new BehaviorSubject<recipePreview[] | null>(null);

  constructor(
    private http: HttpClient,
    private recipeByIdService: RecipeByIdService
  ) {}

  public getSimilarRecipesList(
    quantity: number,
    category: string
  ): BehaviorSubject<recipePreview[] | null> {
    if (!this.recipesSimilarList$.getValue()?.length) {
      this.getRecipeByCategoryAPI('category', category)
        .pipe(
          map((response: recipeByCategoryResponse): any => {
            return from(response.meals)
              .pipe(
                take(quantity),
                mergeMap(
                  (
                    recipe: recipeByCategoryResponseData
                  ): Observable<recipe> => {
                    return this.recipeByIdService.getRecipeById(
                      recipe.idMeal,
                      'short'
                    );
                  }
                ),
                toArray()
              )
              .subscribe((recipe: recipePreview[]) =>
                this.recipesSimilarList$.next(recipe)
              );
          })
        )
        .subscribe();
    }
    return this.recipesSimilarList$;
  }

  public getFilterRecipesList(
    filterType: string,
    filterValue: string,
    quantity: number
  ): Observable<recipePreview[]> {
    const page = this.activePage$.getValue();
    return this.getRecipeByCategoryAPI(filterType, filterValue).pipe(
      mergeMap(
        (response: recipeByCategoryResponse): Observable<recipePreview[]> => {
          const pages = Math.ceil(response.meals.length / quantity);
          this.totalQuantityOfPages$.next(pages);
          return from(response.meals).pipe(
            skip(quantity * (page - 1)),
            take(quantity),
            mergeMap(
              (
                recipe: recipeByCategoryResponseData
              ): Observable<recipePreview> => {
                return this.recipeByIdService.getRecipeById(
                  recipe.idMeal,
                  'short'
                );
              }
            ),
            toArray()
          );
        }
      )
    );
  }

  private getRecipeByCategoryAPI(
    type: string,
    value: string
  ): Observable<recipeByCategoryResponse> {
    return this.http.get<recipeByCategoryResponse>(
      `${env.BASE_URL}/filter.php?${type.slice(0, 1)}=${value}`
    );
  }
}
