import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() tags: string[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
