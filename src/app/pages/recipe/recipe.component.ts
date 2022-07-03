import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, switchMap, map, filter } from 'rxjs'

import { recipe } from 'src/app/models';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  recipe: Observable<recipe> = this.router.paramMap.pipe(
    switchMap((params: ParamMap) => {
      const id = params.get('id');
      return this.recipeService.getRecipeById(id);
    })
  );
  descriptionView = 'ingredients';

  constructor(
    private recipeService: RecipeService,
    private router: ActivatedRoute
  ) {}

  handleButton(event: Event) {
    const type = event.target as HTMLButtonElement;
    this.descriptionView = type.innerHTML.toLowerCase();
  }
  activeButton(type: string) {
    return type.toLowerCase() === this.descriptionView;
  };
}
