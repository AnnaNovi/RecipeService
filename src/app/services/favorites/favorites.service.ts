import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeByIdService } from '../recipe-by-id/recipe-by-id.service';
import {
  BehaviorSubject,
  from,
  skip,
  take,
  mergeMap,
  Observable,
  toArray,
  of,
} from 'rxjs';
import { recipePreview } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  public activePage$: BehaviorSubject<number> = new BehaviorSubject(1);
  public totalQuantityOfPages$: BehaviorSubject<number> = new BehaviorSubject(
    1
  );
  public favoritesRecipesList$: BehaviorSubject<recipePreview[] | null> =
    new BehaviorSubject<recipePreview[] | null>(null);
  private favoritesId: Set<string> = new Set();

  constructor(
    private http: HttpClient,
    private recipeByIdService: RecipeByIdService
  ) {}

  public toggleFavorite(id: string) {
    this.isFavoriteRecipe(id)
      ? this.deleteFavoriteRecipe(id)
      : this.addFavoriteRecipe(id);
  }
  public isFavoriteRecipe(id: string): boolean {
    return this.favoritesId.has(id);
  }

  public getFavoritesRecipes(
    quantity: number
  ): Observable<recipePreview[] | null> {
    if (!this.favoritesId.size) {
      return of(null);
    }
    const page = this.activePage$.getValue();
    const pages = Math.ceil(this.favoritesId.size / quantity);
    this.totalQuantityOfPages$.next(pages);
    return from(this.favoritesId).pipe(
      skip(quantity * (page - 1)),
      take(quantity),
      mergeMap((recipeId: string): Observable<recipePreview> => {
        return this.recipeByIdService.getRecipeById(recipeId, 'short');
      }),
      toArray()
    );
  }

  private addFavoriteRecipe(id: string) {
    this.favoritesId.add(id);
  }
  private deleteFavoriteRecipe(id: string) {
    const newFavoritesRecipesList = this.favoritesRecipesList$.getValue()
      ? //@ts-expect-error
        this.favoritesRecipesList$
          .getValue()
          .filter((recipe: recipePreview) => recipe.id !== id)
      : null;
    this.favoritesId.delete(id);
    this.favoritesRecipesList$.next(newFavoritesRecipesList);
  }
}
