import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  switchMap,
  from,
  map,
  repeat,
  toArray,
  of,
  tap,
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
export class RecipeRandomService {
  private recipesForHomePage: recipePreview[] | null = null;
  private recipesForRecipesPage: recipePreview[] | null = null;

  constructor(
    private http: HttpClient,
    private formatData: FormatDataService
  ) {}

  public getRandomRecipesList(
    type: 'homePage' | 'recipesListPage'
  ): Observable<recipePreview[]> {
    const quantity = this.getQuantityOfRecipesByType(type);
    const previousData = this.getPreviousDataByType(type);

    if (previousData) {
      return of(previousData);
    } else {
      return this.getRandomRecipe().pipe(
        repeat(quantity),
        toArray(),
        tap((item: recipePreview[]) => {
          if (type === 'homePage') {
            this.recipesForHomePage = item;
          } else if (type === 'recipesListPage') {
            this.recipesForRecipesPage = item;
          }
        })
      );
    }
  }

  private getRandomRecipeAPI(): Observable<recipeResponse> {
    return this.http.get<any>(`${env.BASE_URL}/random.php`);
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

  private getQuantityOfRecipesByType(
    type: 'homePage' | 'recipesListPage'
  ): number {
    switch (type) {
      case 'homePage':
        return 8;
      case 'recipesListPage':
        return 16;
      default:
        return 16;
    }
  }

  private getPreviousDataByType(
    type: 'homePage' | 'recipesListPage'
  ): recipePreview[] | null {
    switch (type) {
      case 'homePage':
        return this.recipesForHomePage;
      case 'recipesListPage':
        return this.recipesForRecipesPage;
      default:
        return this.recipesForHomePage;
    }
  }
}
