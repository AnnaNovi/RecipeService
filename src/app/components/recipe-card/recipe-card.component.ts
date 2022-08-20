import { Component, Input, OnInit } from '@angular/core';

import { recipePreview } from 'src/app/models/recipe.model';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  isFavorite: boolean = false;
  @Input() recipe!: recipePreview;

  constructor(private favoritesService: FavoritesService) {}

  public toggleFavorite(id: string) {
    this.favoritesService.toggleFavorite(id);
    this.isFavorite = !this.isFavorite;
  }

  ngOnInit(): void {
    this.isFavorite = this.favoritesService.isFavoriteRecipe(this.recipe.id);
  }
}
