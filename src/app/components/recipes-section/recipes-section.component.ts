import { Component, Input } from '@angular/core';
import { recipePreview } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipes-section',
  templateUrl: './recipes-section.component.html',
  styleUrls: ['./recipes-section.component.scss'],
})
export class RecipesSectionComponent {
  @Input() recipes: recipePreview[] | null = null;
}
