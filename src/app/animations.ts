import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const routerTransition = trigger('routerTransition', [
  transition('home => chat', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
    group([
      query(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('0.3s ease-out', style({transform: 'translateX(0%)', opacity: 1})),
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)', opacity: 1}),
        animate('0.3s ease-out', style({transform: 'translateX(-100%)', opacity: 0})),
      ], {optional: true}),
    ]),
  ]),
  transition('chat => home', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
    group([
      query(':enter', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('0.3s ease-out', style({transform: 'translateX(0%)', opacity: 1})),
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)', opacity: 1}),
        animate('0.3s ease-out', style({transform: 'translateX(100%)', opacity: 0})),
      ], {optional: true}),
    ]),
  ]),
  transition('login => *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
    group([
      // query(':enter', [
      //   style({transform: 'translateY(100%)', opacity: 0}),
      //   animate('0.7s ease-out', style({transform: 'translateY(0%)', opacity: 1})),
      // ], {optional: true}),
      query(':leave', [
        style({transform: 'scale(1)', opacity: 1}),
        animate('1.5s ease-out', style({transform: 'scale(3)', opacity: 0})),
      ], {optional: true}),
    ]),
  ]),
  transition('* => user', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
    group([
      query(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('0.3s ease-out', style({transform: 'translateX(0%)', opacity: 1})),
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)', opacity: 1}),
        animate('0.3s ease-out', style({transform: 'translateX(-100%)', opacity: 0})),
      ], {optional: true}),
    ]),
  ]),
  transition('user => *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
    group([
      query(':enter', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('0.3s ease-out', style({transform: 'translateX(0%)', opacity: 1})),
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)', opacity: 1}),
        animate('0.3s ease-out', style({transform: 'translateX(100%)', opacity: 0})),
      ], {optional: true}),
    ]),
  ]),
]);
