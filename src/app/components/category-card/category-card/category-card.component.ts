import { Component, Input } from '@angular/core';
import { categories } from 'src/app/models';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  @Input() category!: categories;
}
