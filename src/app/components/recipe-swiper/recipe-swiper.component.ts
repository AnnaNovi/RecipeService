import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';

import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';

import { RecipeByFilterService } from 'src/app/services/recipe-by-filter/recipe-by-filter.service';

import { recipe, recipePreview } from 'src/app/models/recipe.model';
import { ActivatedRoute } from '@angular/router';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-recipe-swiper',
  templateUrl: './recipe-swiper.component.html',
  styleUrls: ['./recipe-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeSwiperComponent implements OnDestroy, OnInit {
  public recipesSimilarList$: BehaviorSubject<recipePreview[] | null> | null =
    null;
  private category: string = '';

  public config: SwiperOptions = {
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

  constructor(
    private recipeByFilterService: RecipeByFilterService,
    private activatedRoute: ActivatedRoute
  ) {}

  private getRecipeCategory(): Subscription {
    return this.activatedRoute.data
      .pipe(map((data) => data['recipeById']))
      .subscribe((recipe: recipe) => {
        this.category = recipe.category.toLowerCase();
      });
  }
  private setRecipesSimilarList(): void {
    this.recipesSimilarList$ = this.recipeByFilterService.getSimilarRecipesList(
      9,
      this.category
    );
  }

  ngOnInit(): void {
    this.getRecipeCategory();
    this.setRecipesSimilarList();
  }
  ngOnDestroy(): void {
    this.getRecipeCategory().unsubscribe();
  }
}
