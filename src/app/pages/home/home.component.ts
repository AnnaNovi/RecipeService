import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe/recipe.service'; 
import { RepeatService } from 'src/app/services/repeat/repeat.service';

import {
  recipePreview,
} from 'src/app/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipesPreviewList: recipePreview[] = [];

  constructor(
    private recipeService: RecipeService,
    private repeatService: RepeatService
  ) {}

  getData() {
    this.recipeService.getRandomRecipe(this.recipesPreviewList);
  }
  
  ngOnInit(): void {
    this.repeatService.quantity(this.getData.bind(this), 6);
  }
}
