import { Injectable } from '@angular/core';
import {Post} from "../home/post/Post";

@Injectable({
  providedIn: 'root'
})
export class PostCachingService {
  posts: Post[] = [];
  maxCacheSize: number = 100;
  cacheKey: string = 'posts-cache';

  constructor() {
    this.loadFromLocalStorage();
    window.addEventListener('beforeunload', () => {
      this.saveToLocalStorage();
    });
  }

  private loadFromLocalStorage(): void {
    const cachedData = localStorage.getItem(this.cacheKey);
    if (cachedData) {
      this.posts = JSON.parse(cachedData);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.posts));
  }

  get(id: number): Post | null {
    let data = this.posts.find((item) => item.post_id == id);
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  set(post: Post): void {
    let id = post.post_id;
    let index = this.posts.findIndex((item) => item.post_id == id);
    if (index == -1) {
      this.posts.push(post);
      if (this.posts.length > this.maxCacheSize) {
        this.posts.shift();
      }
    }
  }
}
