import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  showNavBar: boolean = true;
  hasUnreadMsg: boolean = false;
  loadedUp: boolean = false;
  constructor() { }
}
