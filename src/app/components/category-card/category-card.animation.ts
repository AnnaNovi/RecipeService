import { trigger, transition, animate, style } from '@angular/animations';

export const categoryCardAnimation = [
  trigger('categoryCardImage', [
    transition(':enter', [
      style({
        transform: 'rotateY(-90deg)',
      }),
      animate(
        '1s 1s linear',
        style({
          transform: 'rotateY(0deg)',
        })
      ),
    ]),
    transition(
      ':leave',
      animate(
        '1s linear',
        style({
          transform: 'rotateY(90deg)',
        })
      )
    ),
  ]),
  trigger('categoryCardDescription', [
    transition(':enter', [
      style({
        transform: 'rotateY(270deg)',
      }),
      animate(
        '1s 1s linear',
        style({
          transform: 'rotateY(360deg)',
        })
      ),
    ]),
    transition(':leave', [
      style({
        transform: 'rotateY(0deg)',
      }),
      animate(
        '1s linear',
        style({
          transform: 'rotateY(90deg)',
        })
      ),
    ]),
  ]),
];
