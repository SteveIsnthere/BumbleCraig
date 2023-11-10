import {Injectable} from '@angular/core';

export interface SimpleFigureCache {
  id: number;
  data: string;
}

@Injectable({
  providedIn: 'root'
})

export class SimpleFigureCachingService {
  simpleFigures: SimpleFigureCache[] = [];
  maxCacheSize: number = 200;
  cacheKey: string = 'simple-figure-cache';

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const cachedData = localStorage.getItem(this.cacheKey);
    if (cachedData) {
      this.simpleFigures = JSON.parse(cachedData);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.simpleFigures));
  }

  get(id: number): string {
    let data = this.simpleFigures.find((item) => item.id == id);
    if (data) {
      return data.data;
    } else {
      return '';
    }
  }

  set(id: number, data: string) {
    let index = this.simpleFigures.findIndex((item) => item.id == id);
    if (index == -1) {
      this.simpleFigures.push({id: id, data: data});
      if (this.simpleFigures.length > this.maxCacheSize) {
        this.simpleFigures.shift();
        this.saveToLocalStorage();
      }
    } else {
      if (this.simpleFigures[index].data != data){
        this.simpleFigures[index].data = data;
        this.saveToLocalStorage();
      }
    }
  }
}
