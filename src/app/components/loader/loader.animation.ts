import { trigger, transition, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut } from 'ng-animate'


export const loaderAnimation = trigger('loader', [
  transition(
    ':enter',
    useAnimation(fadeIn, {
      params: {
        timing: 0.5,
      },
    })
  ),
  transition(
    ':leave',
    useAnimation(fadeOut, {
      params: {
        timing: 0.5,
      },
    })
  ),
]);