import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-image',
  templateUrl: './recipe-image.component.html',
  styleUrls: ['./recipe-image.component.scss'],
})
export class RecipeImageComponent implements OnInit {
  @Input() imageURL: string = '';
  @Input() title: string = '';

  imageSrc = '';
  isFullImageLoaded = false;

  constructor() {}

  ngOnInit(): void {
    this.imageSrc = `${this.imageURL}/preview`;
    const img = new Image();
    img.src = this.imageURL;
    img.onload = () => {
      this.imageSrc = `${this.imageURL}`;
      this.isFullImageLoaded = true;
    };
  }
}
