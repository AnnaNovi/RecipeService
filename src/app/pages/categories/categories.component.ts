import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { categories } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  public categoriesList$: BehaviorSubject<categories[] | null> =
    this.categoriesService.getCategories$();

  constructor(private categoriesService: CategoriesService) {}
}
