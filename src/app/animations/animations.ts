import { trigger, style, animate, transition, state } from "@angular/animations";

export const fadeIn = trigger('fadeIn', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      transition(':enter', [
          animate(300,style({
              transform:'translateY(0)',
              opacity:1
          })),
      ])
    
    ])
export const largein = trigger('largein', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
          animate(300,style({
              opacity:1
          })),
      ])
    
    ])