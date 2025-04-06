import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeOut = trigger('fadeOut', [
  state('void', style({
    opacity: 0,
    transform: 'translateY(-20px)',
  })),
  transition(':enter', [
    style({ backgroundColor: 'var(--add-color)!important' }),
    animate("200ms ease", style({ backgroundColor: 'transparent', opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    style({ backgroundColor: 'var(--remove-color)!important' }),
    animate("200ms ease", style({ opacity: 0, transform: 'translateY(-50px)' }))
  ])
])

 