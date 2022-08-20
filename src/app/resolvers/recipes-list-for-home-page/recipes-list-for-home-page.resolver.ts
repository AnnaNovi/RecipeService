import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { recipePreview } from 'src/app/models/recipe.model';
import { RecipeRandomService } from 'src/app/services/recipe-random/recipe-random.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesListForHomePageResolver
  implements Resolve<recipePreview[]>
{
  constructor(private recipeRandomService: RecipeRandomService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<recipePreview[]> {
    return this.recipeRandomService.getRandomRecipesList('homePage');
  }
}
