import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'cm-menu',
  standalone: true,
  imports: [
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }),
        animate('0.2s ease-in-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0)'
        }),
        animate('0.2s ease-in-out', style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {

  @HostBinding('@animation') animationState = true;

}
