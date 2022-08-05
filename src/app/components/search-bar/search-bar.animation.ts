import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInRight, fadeOutRight, slideInRight } from 'ng-animate';

export const searchBarAnimation = trigger('searchBar', [
  transition(
    ':enter',
    useAnimation(fadeInRight, {
      params: {
        timing: 0.3,
      },
    })
  ),
  transition(
    ':leave',
    useAnimation(fadeOutRight, {
      params: {
        timing: 0.2,
      },
    })
  ),
]);
