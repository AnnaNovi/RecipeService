import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { recipePreview } from 'src/app/models';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesResolver implements Resolve<recipePreview[] | null> {
  constructor(private favoritesService: FavoritesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<recipePreview[] | null> {
    return this.favoritesService.getFavoritesRecipes(16);
  }
}
