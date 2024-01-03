import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {MainService} from "../../../../services/main.service";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-post-section-view-base',
  templateUrl: './post-section-view-base.component.html',
  styleUrl: './post-section-view-base.component.css'
})
export class PostSectionViewBaseComponent implements OnInit, OnDestroy {
  @Input() postIDs: number[] = [];
  wideMode = false;
  postIDsWide: number[][] = [];
  padding = 15;
  wideModePostWidth = 470;

  touchDevice = false;
  private resizeSubscription: Subscription = new Subscription();

  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.touchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)

    // subscribe to the resize event
    this.resizeSubscription = fromEvent(window, 'resize').pipe(
      debounceTime(200),
    ).subscribe(() => {
      this.resizeIfNecessary()
    })

    this.resizeIfNecessary()
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
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
