import {animate, group, query, style, transition, trigger} from "@angular/animations";

const transitionQuery = query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true})

function stdTransitionAway(duration: number = 0.5) {
  return [
    transitionQuery,
    group([
      query(':enter', [
        style({transform: 'translateX(100%)'}),
        animate(duration + 's ease-in-out', style({transform: 'translateX(0%)'})),
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)'}),
        animate(duration + 's ease-in-out', style({transform: 'translateX(-100%)'})),
      ], {optional: true}),
    ]),
  ];
}

function stdTransitionBack(duration: number = 0.5) {
  return [
    transitionQuery,
    group([
      query(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate(duration + 's ease-in-out', style({transform: 'translateX(0%)'})),
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)'}),
        animate(duration + 's ease-in-out', style({transform: 'translateX(100%)'})),
      ], {optional: true}),
    ]),
  ];
}

function epicZoomTransition(duration: number = 1.5) {
  return [
    transitionQuery,
//     group([
//       // query(':enter', [
//       //   style({transform: 'translateY(100%)', opacity: 0}),
//       //   animate('0.7s ease-out', style({transform: 'translateY(0%)', opacity: 1})),
//       // ], {optional: true}),
    query(':leave', [
      style({transform: 'scale(1)', opacity: 1}),
      animate(duration + 's ease-out', style({transform: 'scale(3)', opacity: 0})),
    ], {optional: true}),
  ]
}

export const routerTransition = trigger('routerTransition', [
  transition('home => chat', stdTransitionAway()),
  transition('chat => home', stdTransitionBack()),
  transition('login => *', epicZoomTransition()),
  transition('* => user', stdTransitionAway()),
  transition('user => *', stdTransitionBack()),
  transition('* => friends', stdTransitionAway()),
  transition('friends => *', stdTransitionBack()),
  transition('new-post => *', epicZoomTransition(0.6)),
]);
