import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { recipePreview } from 'src/app/models/recipe.model';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public recipesPreviewList$: BehaviorSubject<recipePreview[] | null> =
    this.favoritesService.favoritesRecipesList$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private favoritesService: FavoritesService
  ) {}

  private setRecipesPreviewList(): Subscription {
    return this.activatedRoute.data
      .pipe(
        map((data) => {
          this.favoritesService.favoritesRecipesList$.next(data['recipesList']);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.setRecipesPreviewList();
  }
  ngOnDestroy(): void {
    this.setRecipesPreviewList().unsubscribe();
  }
}
