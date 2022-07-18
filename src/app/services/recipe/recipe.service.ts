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
  skip,
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
  activePage$: BehaviorSubject<number> = new BehaviorSubject(1);
  filterListPages$: BehaviorSubject<number> = new BehaviorSubject(1);
  private recipesSimilarList$: BehaviorSubject<any> = new BehaviorSubject([]);
  private recipesFilterList$: BehaviorSubject<any> = new BehaviorSubject([]);

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
    type: string,
    value: string
  ): Observable<recipeByCategoryResponse> {
    return this.http.get<any>(
      `${env.BASE_URL}/filter.php?${type.slice(0, 1)}=${value}`
    );
  }

  private getRandomRecipe(): Observable<recipePreview> {
    return this.getRandomRecipeAPI().pipe(
      switchMap((response: recipeResponse): Observable<recipeResponseData> => {
        return from(response.meals);
      }),
      map((recipe: recipeResponseData) => {
        return this.formatData.format(recipe, 'short');
      })
    );
  }

  getRandomRecipesList(quantity: number): Observable<recipePreview[]> {
    return this.getRandomRecipe().pipe(repeat(quantity), toArray());
  }

  getRecipeById(
    id: string | null,
    type: 'short' | 'full' = 'full'
  ): Observable<any> {
    return this.getRecipeByIdAPI(id).pipe(
      map((response: recipeResponse): recipeResponseData => {
        return response.meals[0];
      }),
      map((recipe: recipeResponseData) => {
        return this.formatData.format(recipe, type);
      })
    );
  }

  getSimilarRecipesList(
    quantity: number,
    category: string
  ): BehaviorSubject<recipe[]> {
    if (!this.recipesSimilarList$.getValue().length) {
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
                    return this.getRecipeById(recipe.idMeal, 'short');
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

  getFilterRecipesList(
    filter: {
      type: string;
      value: string;
    },
    quantity: number,
    page: number
  ): BehaviorSubject<recipePreview[]> {
    this.getRecipeByCategoryAPI(filter.type, filter.value)
      .pipe(
        map((response: recipeByCategoryResponse): any => {
          const pages = Math.ceil(response.meals.length / quantity);
          this.filterListPages$.next(pages);
          return from(response.meals)
            .pipe(
              skip(quantity * (page - 1)),
              take(quantity),
              mergeMap(
                (recipe: recipeByCategoryResponseData): Observable<recipe> => {
                  return this.getRecipeById(recipe.idMeal, 'short');
                }
              ),
              toArray()
            )
            .subscribe((recipe: recipePreview[]) => {
              this.recipesFilterList$.next(recipe);
            });
        })
      )
      .subscribe();
    return this.recipesFilterList$;
  }
}
