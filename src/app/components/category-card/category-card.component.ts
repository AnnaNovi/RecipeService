import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { categories } from 'src/app/models';
import {categoryCardAnimation} from './category-card.animation';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  animations: [categoryCardAnimation],
})
export class CategoryCardComponent {
  backOfCard = false;
  imageHeight = 0;

  @Input() category!: categories;
  @ViewChild('categoryCardImage')
  categoryCardImage!: ElementRef<HTMLDivElement>;

  toggleBackOfCard() {
    this.imageHeight = this.categoryCardImage?.nativeElement.clientHeight;
    this.backOfCard = !this.backOfCard;
  }

}
