import { state, trigger, transition, style, useAnimation, animate } from "@angular/animations";
import { rotateIn } from 'ng-animate'


export const loaderAnimation = trigger('loader', [
  transition(':enter', useAnimation(rotateIn, {
    delay: 4000,
    params: {
      degrees: '-180deg',
      fromOpacity: 1,
      toOpacity: 1,
      origin: 'center center'
    }
  })),
  /* state(
    'start',
    style({
      transform: 'rotate(0deg)',
    })
  ),
  state(
    'end',
    style({
      transform: 'rotate(359deg)',
    })
  ),
  transition('start => end', animate('5s linear', style({
      animationIterationCount: 'infinite'
    })
  )), */
]);