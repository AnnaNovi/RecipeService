import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeByIdService } from 'src/app/services/recipe-by-id/recipe-by-id.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeByIdResolver implements Resolve<boolean> {
  constructor(private recipeByIdService: RecipeByIdService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = route.paramMap.get('id');
    return this.recipeByIdService.getRecipeById(id);
  }
}
