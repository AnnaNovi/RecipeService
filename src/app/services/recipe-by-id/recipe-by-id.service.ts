import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { recipeResponse, recipeResponseData } from 'src/app/models';
import { FormatDataService } from '../format-recipe-data/format-recipe-data.service';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RecipeByIdService {
  constructor(
    private http: HttpClient,
    private formatData: FormatDataService
  ) {}

  public getRecipeById(
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

  private getRecipeByIdAPI(id: string | null): Observable<recipeResponse> {
    return this.http.get<recipeResponse>(`${env.BASE_URL}/lookup.php?i=${id}`);
  }
}
