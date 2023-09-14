import { Injectable } from '@angular/core';
import {GroupEssentialData} from "../chat/group/GroupEssentialData";

@Injectable({
  providedIn: 'root'
})
export class GroupBasicInfoCachingService {

  groupEssentialData: GroupEssentialData[] = [];
  maxCacheSize: number = 50;
  cacheKey: string = 'group-basic-info-cache';

  constructor() {
    this.loadFromLocalStorage();
    window.addEventListener('beforeunload', () => {
      this.saveToLocalStorage();
    });
  }

  private loadFromLocalStorage(): void {
    const cachedData = localStorage.getItem(this.cacheKey);
    if (cachedData) {
      this.groupEssentialData = JSON.parse(cachedData);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.groupEssentialData));
  }

  get(id: number)    {
    let data = this.groupEssentialData.find((item) => item.group_id == id);
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  set(group: GroupEssentialData): void {
    let id = group.group_id;
    let index = this.groupEssentialData.findIndex((item) => item.group_id == id);
    if (index == -1) {
      this.groupEssentialData.push(group);
      if (this.groupEssentialData.length > this.maxCacheSize) {
        this.groupEssentialData.shift();
      }
    } else {
      this.groupEssentialData[index] = group;
    }
  }
}
