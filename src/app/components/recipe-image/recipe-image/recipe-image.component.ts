import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-image',
  templateUrl: './recipe-image.component.html',
  styleUrls: ['./recipe-image.component.scss'],
})
export class RecipeImageComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() title: string = '';

  imageSrc = '';
  isFullImageLoaded = false;

  constructor() {}

  ngOnInit(): void {
    this.imageSrc = `${this.imageUrl}/preview`;
    const img = new Image();
    img.src = this.imageUrl;
    img.onload = () => {
      this.imageSrc = `${this.imageUrl}`;
      this.isFullImageLoaded = true;
    };
  }
}
