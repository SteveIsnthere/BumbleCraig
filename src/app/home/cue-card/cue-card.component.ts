import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MainService} from "../../services/main.service";
import {apiEndPoint, siteName} from "../../env";
import {HttpClient} from "@angular/common/http";
import {AssistantComponent} from "../assistant/assistant.component";
import {NotificationViewComponent} from "../notification-view/notification-view.component";
import {debounceTime, fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-cue-card',
  templateUrl: './cue-card.component.html',
  styleUrl: './cue-card.component.css'
})
export class CueCardComponent implements OnInit, OnDestroy {
  topUserIDs: number[] = [];
  topBarOffset = 0;
  topBarHeight = 74;
  lastScrollTop: number = 0;
  isScrolling = false;
  private resizeSubscription: Subscription = new Subscription();

  constructor(public auth: AuthService, private dialog: MatDialog, public main: MainService, public http: HttpClient) {
    this.lastScrollTop = 0;
  }


  ngOnInit(): void {
    window.addEventListener('scroll', this.onScrollThrottled);
    this.resizeSubscription = fromEvent(window, 'resize').pipe(
      debounceTime(200),
    ).subscribe(() => {
      this.manageTopUsers()
    })

    this.manageTopUsers()
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScrollThrottled);
    this.resizeSubscription.unsubscribe();
  }

  manageTopUsers() {
    if (window.innerWidth < 600) {
      this.topUserIDs = [];
      return;
    }
    if (this.topUserIDs.length == 0) {
      this.http.get<number[]>(apiEndPoint + '/others/top-users/').subscribe((data) => {
        this.topUserIDs = data;
      });
    }
  }

  onScrollThrottled = () => {
    if (!this.isScrolling) {
      this.isScrolling = true;
      requestAnimationFrame(this.onScroll);
    }
  }

  onScroll = () => {
    const scrollTop = window.scrollY;
    const deltaScroll = scrollTop - this.lastScrollTop;

    this.lastScrollTop = scrollTop;

    if (scrollTop < this.topBarHeight) {
      this.topBarOffset = 0;
    } else if (deltaScroll > 0) {
      if (deltaScroll > 20) {
        this.topBarOffset = this.topBarOffset + deltaScroll;
      } else {
        this.topBarOffset = this.topBarOffset + deltaScroll/5;
      }
      if (this.topBarOffset > this.topBarHeight) {
        this.topBarOffset = this.topBarHeight;
      }
    } else {
      if (deltaScroll < -20) {
        this.topBarOffset = 0;
      } else {
        this.topBarOffset = this.topBarOffset + deltaScroll / 5;
        if (this.topBarOffset < 0) {
          this.topBarOffset = 0;
        }
      }
    }
    this.isScrolling = false;
  }

  topBarStyle() {
    return {
      'top': -this.topBarOffset + 'px',
      // 'opacity': 1 - this.topBarOffset / this.topBarHeight,
    }
  }

  notificationCount() {
    return this.main.getTotalMessageCount();
  }

  openUserBriefView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'post-back-drop';

    this.dialog.open(NotificationViewComponent, dialogConfig);
  }

  openAssistant() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'post-back-drop';
    this.dialog.open(AssistantComponent, dialogConfig);
  }


  logout() {
    this.auth.logout();
  }

  protected readonly siteName = siteName;
}
