import { TestBed } from '@angular/core/testing';
import {
  recipe,
  recipePreview,
  recipeResponseData,
} from 'src/app/models/recipe.model';

import { FormatDataService } from './format-recipe-data.service';

describe('FormatDataService', () => {
  let formatDataService: FormatDataService;
  let recipe: recipeResponseData;
  let expectedFullRecipe: recipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    formatDataService = TestBed.inject(FormatDataService);

    recipe = {
      idMeal: '52994',
      strMeal:
        'Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini',
      strDrinkAlternate: null,
      strCategory: 'Pork',
      strArea: 'American',
      strInstructions: '\r\nServes 2\r\n\r\n\r\n1. \r\n\r\nAdjust racks...',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/h3ijwo1581013377.jpg',
      strTags: null,
      strYoutube: '',
      strIngredient1: 'Potatoes',
      strIngredient2: 'Apples',
      strIngredient3: 'Garlic',
      strIngredient4: 'Lemon',
      strIngredient5: 'Pork',
      strIngredient6: 'Zucchini',
      strIngredient7: 'Chicken Stock',
      strIngredient8: 'Vegetable Oil',
      strIngredient9: 'Sugar',
      strIngredient10: 'Butter',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: '',
      strIngredient17: '',
      strIngredient18: '',
      strIngredient19: '',
      strIngredient20: '',
      strMeasure1: '2',
      strMeasure2: '1',
      strMeasure3: '2 cloves',
      strMeasure4: '1',
      strMeasure5: '2',
      strMeasure6: '1',
      strMeasure7: '1',
      strMeasure8: '1 tbsp',
      strMeasure9: '1 1/2 tsp ',
      strMeasure10: '2 tbsp',
      strMeasure11: ' ',
      strMeasure12: ' ',
      strMeasure13: ' ',
      strMeasure14: ' ',
      strMeasure15: ' ',
      strMeasure16: ' ',
      strMeasure17: ' ',
      strMeasure18: ' ',
      strMeasure19: ' ',
      strMeasure20: ' ',
      strSource: '',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    };

    expectedFullRecipe = {
      id: '52994',
      title: 'Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini',
      tags: null,
      imageURL:
        'https://www.themealdb.com/images/media/meals/h3ijwo1581013377.jpg',
      category: 'Pork',
      instruction: '\r\nServes 2\r\n\r\n\r\n1. \r\n\r\nAdjust racks...',
      ingredients: new Map(),
      videoURL: '',
      source: '',
    };
  });

  it('should be created', () => {
    expect(formatDataService).toBeTruthy();
  });
  it('should return short type of input recipe data if parameter type is "short"', () => {
    const expectedShortRecipe: recipePreview = {
      id: '52994',
      title: 'Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini',
      tags: null,
      imageURL:
        'https://www.themealdb.com/images/media/meals/h3ijwo1581013377.jpg',
    };
    const result = formatDataService.format(recipe, 'short');
    expect(expectedShortRecipe).toEqual(result);
  });

  it('should return full type of input recipe data if parameter type is "full" or not set', () => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = `strIngredient${i}`;
      const measure = `strMeasure${i}`;
      if (recipe[ingredient]?.trim() || recipe[measure]?.trim()) {
        expectedFullRecipe.ingredients.set(recipe[ingredient], recipe[measure]);
      }
    }
    const resultFull = formatDataService.format(recipe, 'full');
    expect(expectedFullRecipe)
      .withContext('type is "full"')
      .toEqual(resultFull);

    const resultEmpty = formatDataService.format(recipe);
    expect(expectedFullRecipe)
      .withContext("type isn't set")
      .toEqual(resultEmpty);
  });

  it('should return array of tags if tags exist', () => {
    recipe.strTags = 'Tart,Baking';
    const result = formatDataService.format(recipe, 'full');
    expect(result.tags).toEqual(['Tart', 'Baking']);
  });
});
