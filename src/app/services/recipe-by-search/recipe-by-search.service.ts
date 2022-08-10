import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  from,
  map,
  Observable,
  switchMap,
  skip,
  take,
  toArray,
  BehaviorSubject,
  catchError,
  of,
} from 'rxjs';
import {
  recipePreview,
  recipeResponse,
  recipeResponseData,
} from 'src/app/models';
import { environment as env } from 'src/environments/environment.prod';
import { FormatDataService } from '../format-recipe-data/format-recipe-data.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeBySearchService {
  activePage$: BehaviorSubject<number> = new BehaviorSubject(1);
  totalQuantityOfPages$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(
    private http: HttpClient,
    private formatData: FormatDataService
  ) {}

  public getSearchResultRecipesList(
    value: string | null,
    quantity: number = 16
  ): Observable<recipePreview[] | null> {
    const page = this.activePage$.getValue();
    return this.getRecipeBySearchAPI(value).pipe(
      switchMap((response: recipeResponse): Observable<recipeResponseData> => {
        if (!response.meals) {
          throw null;
        }
        const pages = Math.ceil(response.meals.length / quantity);
        this.totalQuantityOfPages$.next(pages);
        const sortedByNameRecipesList = response.meals.sort(
          (a: recipeResponseData, b: recipeResponseData) => {
            if (value) {
              const indexOfA = a.strMeal
                .toLowerCase()
                .indexOf(value.toLowerCase());
              const indexOfB = b.strMeal
                .toLowerCase()
                .indexOf(value.toLowerCase());
              return indexOfA - indexOfB;
            } else {
              return 0;
            }
          }
        );
        return from(sortedByNameRecipesList);
      }),
      skip(quantity * (page - 1)),
      take(quantity),
      map((recipe: recipeResponseData): recipePreview => {
        return this.formatData.format(recipe, 'short');
      }),
      toArray(),
      catchError((error: any) => {
        return of(error);
      })
    );
  }

  private getRecipeBySearchAPI(
    value: string | null
  ): Observable<recipeResponse> {
    return this.http.get<recipeResponse>(
      `${env.BASE_URL}/search.php?s=${value}`
    );
  }
}
