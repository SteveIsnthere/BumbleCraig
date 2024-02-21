import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  sessionPassword = "";

  @Output() shouldLoginAsVisitorEvent = new EventEmitter<string>()

  constructor() {
  }

  fireShouldLoginAsVisitorEvent() {
    this.sessionPassword = ""
    this.shouldLoginAsVisitorEvent.emit("should-login-as-visitor")
    alert("You have been logged out due to unauthorized access. Please login again.")
  }
}
