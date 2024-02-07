import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {MainService} from "../../../../services/main.service";
import {MatDialog} from "@angular/material/dialog";
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDivider } from '@angular/material/divider';
import { PostComponent } from '../../post.component';



@Component({
    selector: 'app-post-section-view-base',
    templateUrl: './post-section-view-base.component.html',
    styleUrl: './post-section-view-base.component.scss',
    standalone: true,
    imports: [PostComponent, MatDivider, MatProgressBar]
})
export class PostSectionViewBaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() postIDs: number[] = [];
  @Output() postsRanOutEvent = new EventEmitter<string>();
  initLoadingSize = 4;
  postReloadSize = 2;
  restOfPostIDs: number[] = [];
  wideMode = false;
  postIDsWide: number[][] = [];
  padding = 15;
  wideModePostWidth = 470;
  scrollingTask: any;
  loadingMorePosts = false;
  requestedMorePosts = false;
  touchDevice = false;
  private resizeSubscription: Subscription = new Subscription();
  @ViewChild('postsContainer', {static: false}) postsContainer!: ElementRef;

  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.restOfPostIDs = this.postIDs.slice(this.initLoadingSize);
    this.postIDs = this.postIDs.slice(0, this.initLoadingSize);

    this.touchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
    // subscribe to the resize event
    this.resizeSubscription = fromEvent(window, 'resize').pipe(
      debounceTime(200),
    ).subscribe(() => {
      this.resizeIfNecessary()
    })
    this.resizeIfNecessary()
    setTimeout(() => {
      this.checkIfNeedToLoadMore()
    }, 1000)
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScrollThrottled);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollThrottled);
    this.resizeSubscription.unsubscribe();
  }


  loadMorePosts() {
    if (this.loadingMorePosts) return;
    this.loadingMorePosts = true;
    if (!this.wideMode) {
      this.postIDs = this.postIDs.concat(this.restOfPostIDs.slice(0, this.postReloadSize));
      this.restOfPostIDs = this.restOfPostIDs.slice(this.postReloadSize);
    } else {
      const newPostIDs = this.restOfPostIDs.slice(0, this.postReloadSize * this.postIDsWide.length)
      this.postIDs = this.postIDs.concat(newPostIDs);
      this.restOfPostIDs = this.restOfPostIDs.slice(this.postReloadSize * this.postIDsWide.length);

      for (let i = 0; i < newPostIDs.length; i++) {
        let column = i % this.postIDsWide.length;
        this.postIDsWide[column].push(newPostIDs[i]);
      }
    }
    setTimeout(() => {
      this.loadingMorePosts = false;
    }, 300);

    if (this.restOfPostIDs.length == 0) return;
    setTimeout(() => {
      this.checkIfNeedToLoadMore();
    }, 1000);
  }

  requestMorePosts() {
    if (this.requestedMorePosts) return;
    this.requestedMorePosts = true;
    this.postsRanOutEvent.emit();
    setTimeout(() => {
      this.requestedMorePosts = false;
    }, 2000);
  }

  onScrollThrottled = () => {
    if (this.scrollingTask) {
      clearTimeout(this.scrollingTask);
    }
    this.scrollingTask = setTimeout(() => {
      this.checkIfNeedToLoadMore();
    }, 50);
  }

  checkIfNeedToLoadMore = () => {
    const scrollTop = window.scrollY;
    const divHeight = this.postsContainer.nativeElement.offsetHeight + 74;

    const remainingScroll = divHeight - scrollTop - window.innerHeight;

    let heightThreshold = 1500;
    if (this.wideMode) {
      // heightThreshold = heightThreshold/this.postIDsWide.length;
      heightThreshold = heightThreshold / 2;
    }
    if (remainingScroll < heightThreshold) {
      if (this.restOfPostIDs.length > 0) {
        this.loadMorePosts();
      } else {
        this.requestMorePosts()
      }
    }
  }

  resizeIfNecessary() {
    const width = window.innerWidth;
    const postWidthMin = 400;

    const maxColumns = Math.floor((width - this.padding * 2) / postWidthMin);

    if (maxColumns < 2) {
      this.wideMode = false;
      return;
    }

    if (!this.wideMode) this.wideMode = true;
    // if (this.postIDsWide.length == maxColumns) return;
    let _postIDsWide: number[][] = [];
    const numberOfPosts = this.postIDs.length;
    // for (let i = 0; i < maxColumns; i++) {
    //   _postIDsWide.push(this.postIDs.slice(i * Math.ceil(numberOfPosts / maxColumns), (i + 1) * Math.ceil(numberOfPosts / maxColumns)));
    // }
    for (let i = 0; i < maxColumns; i++) {
      _postIDsWide.push([]);
    }
    for (let i = 0; i < numberOfPosts; i++) {
      let column = i % maxColumns;
      _postIDsWide[column].push(this.postIDs[i]);
    }
    if (this.postIDsWide != _postIDsWide) {
      this.postIDsWide = _postIDsWide;
    }
    this.wideModePostWidth = Math.floor((width - this.padding * 2) / maxColumns);
  }
}
