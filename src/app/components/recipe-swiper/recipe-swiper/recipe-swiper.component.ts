import { Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';

import { RecipeService } from 'src/app/services/recipe/recipe.service';

import { recipe } from 'src/app/models';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-recipe-swiper',
  templateUrl: './recipe-swiper.component.html',
  styleUrls: ['./recipe-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeSwiperComponent {
  recipesSimilarList$: BehaviorSubject<recipe[]> =
    this.recipeService.getSimilarRecipesList(9, 'Vegetarian');

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    speed: 600,
    allowSlidePrev: true,
    pagination: { clickable: true },
    navigation: true,
    scrollbar: { draggable: true },
    breakpoints: {
      992: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      450: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
  };

  constructor(private recipeService: RecipeService) {}
}
