import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { recipePreview } from 'src/app/models/recipe.model';
import { RecipeRandomService } from 'src/app/services/recipe-random/recipe-random.service';
import { RecipeByFilterService } from 'src/app/services/recipe-by-filter/recipe-by-filter.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesListForRecipesListPageResolver
  implements Resolve<recipePreview[]>
{
  constructor(
    private recipeRandomService: RecipeRandomService,
    private recipeByFilterService: RecipeByFilterService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<recipePreview[]> {
    const type = route.paramMap.get('categoryType');
    const value = route.paramMap.get('categoryValue');

    if (type && value && value !== 'default') {
      return this.recipeByFilterService.getFilterRecipesList(type, value, 16);
    } else {
      return this.recipeRandomService.getRandomRecipesList('recipesListPage');
    }
  }
}
