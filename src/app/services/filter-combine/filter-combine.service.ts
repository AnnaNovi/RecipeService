import { Injectable } from '@angular/core';
import { CategoriesService } from '../categories/categories.service';
import { AreasService } from '../areas/areas.service';
import { IngredientsService } from '../ingredients/ingredients.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterCombineService {
  constructor(
    private categoriesService: CategoriesService,
    private areasService: AreasService,
    private ingredientsService: IngredientsService
  ) {}

  getFilterByType(
    type: 'category' | 'area' | 'ingredient'
  ): BehaviorSubject<any[]> {
    switch (type) {
      case 'category':
        return this.categoriesService.getCategories$();
      case 'area':
        return this.areasService.getAreas$();
      case 'ingredient':
        return this.ingredientsService.getIngredients$();
    }
  }
}
