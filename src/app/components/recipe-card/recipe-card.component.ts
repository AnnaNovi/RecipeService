import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() tags: string[] | null = [];

}
