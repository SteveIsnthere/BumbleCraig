import { Injectable } from '@angular/core';
import {EssentialUserData} from "../user/UserModel";

@Injectable({
  providedIn: 'root'
})
export class UserInfoCachingService {
  users: EssentialUserData[] = [];
  maxCacheSize: number = 100;
  cacheKey: string = 'users-cache';

  constructor() {
    this.loadFromLocalStorage();
    window.addEventListener('beforeunload', () => {
      this.saveToLocalStorage();
    });
  }

  private loadFromLocalStorage(): void {
    const cachedData = localStorage.getItem(this.cacheKey);
    if (cachedData) {
      this.users = JSON.parse(cachedData);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.users));
  }

  get(id: number): EssentialUserData | null {
    let data = this.users.find((item) => item.user_id == id);
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  set(user: EssentialUserData): void {
    let id = user.user_id;
    let index = this.users.findIndex((item) => item.user_id == id);
    if (index == -1) {
      this.users.push(user);
      if (this.users.length > this.maxCacheSize) {
        this.users.shift();
      }
    }
  }
}
