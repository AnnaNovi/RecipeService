import { Injectable } from '@angular/core';

import {
  recipeResponseData,
  recipePreview,
  recipe,
} from 'src/app/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class FormatDataService {
  public format(
    recipe: recipeResponseData,
    type: 'short' | 'full' = 'full'
  ): recipePreview | recipe {
    const ingredientsArray = new Map();
    const tags = recipe.strTags ? recipe.strTags.split(',') : null;
    const shortType: recipePreview = {
      id: recipe.idMeal,
      title: recipe.strMeal,
      tags: tags,
      imageURL: recipe.strMealThumb,
    };
    const fullType: recipe = {
      id: recipe.idMeal,
      title: recipe.strMeal,
      tags: tags,
      imageURL: recipe.strMealThumb,
      category: recipe.strCategory,
      instruction: recipe.strInstructions,
      ingredients: ingredientsArray,
      videoURL: recipe.strYoutube,
      source: recipe.strSource,
    };
    if (type === 'short') {
      return shortType;
    } else {
      for (let i = 1; i <= 20; i++) {
        const ingredient = `strIngredient${i}`;
        const measure = `strMeasure${i}`;
        if (recipe[ingredient]?.trim() || recipe[measure]?.trim()) {
          ingredientsArray.set(recipe[ingredient], recipe[measure]);
        }
      }
      return fullType;
    }
  }
}
