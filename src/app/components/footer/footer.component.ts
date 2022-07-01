import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { categories } from 'src/app/models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  categoriesList: categories[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories(this.categoriesList);
  }
}
