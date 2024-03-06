import {animate, group, query, style, transition, trigger} from "@angular/animations";

const transitionQuery = query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true})

function transXAway(duration: number = 0.5) {
  return [
    transitionQuery,
    group([
      query(':enter', [
        style({transform: 'translateX(100%)', height: '100%'}),
        animate(duration + 's ease', style({transform: 'translateX(0%)', height: '100%'})),
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)', height: '100%'}),
        animate(duration + 's ease', style({transform: 'translateX(-100%)', height: '100%'})),
      ], {optional: true}),
    ]),
  ];
}

function transXABack(duration: number = 0.5) {
  return [
    transitionQuery,
    group([
      query(':enter', [
        style({transform: 'translateX(-100%)', height: '100%'}),
        animate(duration + 's ease', style({transform: 'translateX(0%)', height: '100%'})),
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)', height: '100%'}),
        animate(duration + 's ease', style({transform: 'translateX(100%)', height: '100%'})),
      ], {optional: true}),
    ]),
  ];
}

function stdTransitionAway(duration: number = 0.4) {
  return [
    transitionQuery,
    group([
      query(':enter', [
        style({
          opacity: 1,
          transform: 'scale(0.9) translateY(100%)', height: '100%'
        }),
        animate(duration + 's ease', style({
          opacity: 1,
          transform: 'scale(1) translateY(0%)', height: '100%'
        })),
      ], {optional: true}),
      query(':leave', [
        style({
          opacity: 0.5,
          transform: 'scale(1)', height: '100%'
        }),
        animate(duration + 's ease', style({
          opacity: 0,
          transform: 'scale(0.8)', height: '100%'
        })),
      ], {optional: true}),
    ]),
  ];
}

function stdTransitionBack(duration: number = 0.3) {
  return [
    transitionQuery,
    group([
      query(':enter', [
        style({
          opacity: 1,
          transform: 'scale(1)', height: '100%'
        }),
        animate(duration + 's ease', style({
          opacity: 1,
          transform: 'scale(1)', height: '100%'
        })),
      ], {optional: true}),
      query(':leave', [
        style({
          opacity: 0.4,
          transform: 'scale(1) translateY(0%)', height: '100%'
        }),
        animate(duration + 's ease', style({
          opacity: 0,
          transform: 'scale(0.9) translateY(100%)', height: '100%'
        })),
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
      style({transform: 'scale(1)', opacity: 1, height: '100%'}),
      animate(duration + 's ease-out', style({transform: 'scale(3)', opacity: 0, height: '100%'})),
    ], {optional: true}),
  ]
}

export const routerTransition = trigger('routerTransition', [
  // transition('home => chat', stdTransitionAway()),
  // transition('chat => home', stdTransitionBack()),
  // transition('chat => group', transXAway()),
  // transition('group => chat', transXABack()),
  // transition('login => *', epicZoomTransition()),
  // transition('* => login', stdTransitionAway()),
  // transition('* => user', stdTransitionAway()),
  // transition('user => *', stdTransitionBack()),
  // transition('* => friends', stdTransitionAway()),
  // transition('friends => *', stdTransitionBack()),
  // transition('* => new-post', transXAway(0.6)),
  // transition('new-post => *', epicZoomTransition(0.6)),
  transition('* => new-post', transXAway(0.6)),
  transition('new-post => *', epicZoomTransition(0.6)),
  transition('home => *', stdTransitionAway()),
  transition('* => home', stdTransitionBack()),
  transition('chat => group', transXAway()),
  transition('group => chat', transXABack()),
  transition('* => user', stdTransitionAway()),
  transition('user => *', stdTransitionBack()),
  transition('* => friends', stdTransitionAway()),
  transition('friends => *', stdTransitionBack()),
]);
