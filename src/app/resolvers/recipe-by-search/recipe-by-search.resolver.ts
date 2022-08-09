import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { recipePreview } from 'src/app/models';
import { RecipeBySearchService } from 'src/app/services/recipe-by-search/recipe-by-search.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeBySearchResolver implements Resolve<recipePreview[] | null> {
  constructor(private recipeBySearchService: RecipeBySearchService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<recipePreview[]> | Observable<null> {
    const searchValue = route.queryParamMap.get('value');
    return this.recipeBySearchService.getSearchResultRecipesList(searchValue);
  }
}
