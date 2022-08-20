import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { categories } from 'src/app/models/category.model';
import { categoryCardAnimation } from './category-card.animation';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  animations: [categoryCardAnimation],
})
export class CategoryCardComponent {
  public backOfCard = false;
  public imageHeight = 0;

  @Input() category!: categories;
  @ViewChild('categoryCardImage')
  categoryCardImage: ElementRef<HTMLDivElement> | null = null;

  public toggleBackOfCard() {
    if (this.categoryCardImage) {
      this.imageHeight = this.categoryCardImage?.nativeElement.clientHeight;
    }
    this.backOfCard = !this.backOfCard;
  }
}
