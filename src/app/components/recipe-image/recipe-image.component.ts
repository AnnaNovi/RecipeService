import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-image',
  templateUrl: './recipe-image.component.html',
  styleUrls: ['./recipe-image.component.scss'],
})
export class RecipeImageComponent implements OnChanges {
  public imageSrc = '';
  public isFullImageLoaded = false;

  @Input() imageURL: string = '';
  @Input() title: string = '';

  private updateImageURL() {
    this.imageSrc = `${this.imageURL}/preview`;
    const img = new Image();
    img.src = this.imageURL;
    img.onload = () => {
      this.imageSrc = `${this.imageURL}`;
      this.isFullImageLoaded = true;
    };
  }

  ngOnChanges(): void {
    this.updateImageURL();
  }
}
