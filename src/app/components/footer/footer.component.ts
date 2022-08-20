import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { categories } from 'src/app/models/category.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public categoriesList$: BehaviorSubject<categories[] | null> =
    this.categoriesService.getCategories$();

  constructor(private categoriesService: CategoriesService) {}
}
