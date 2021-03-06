import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { categories } from 'src/app/models';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categoriesList$: BehaviorSubject<categories[]> =
    this.categoriesService.getCategories$();

  constructor(private categoriesService: CategoriesService) {}
}
