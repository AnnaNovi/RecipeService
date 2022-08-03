import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, map } from 'rxjs';

import { recipe } from 'src/app/models';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  recipe: Observable<recipe> = this.activatedRoute.data.pipe(
    map((data) => data['recipeById'])
  );
  descriptionView = 'ingredients';

  constructor(private activatedRoute: ActivatedRoute) {}

  changeDescriptionView(event: Event) {
    const type = event.target as HTMLButtonElement;
    this.descriptionView = type.innerHTML.toLowerCase().trim();
    console.log(this.descriptionView);
  }
  isActiveButton(type: string) {
    return this.descriptionView === type.toLowerCase();
  }
}
