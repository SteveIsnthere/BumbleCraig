import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  hasUnreadMsg: boolean = false;
  loadedUp: boolean = false;
  constructor() { }
}
