import {Component, ElementRef, OnDestroy, OnInit, signal} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MainService} from "../../services/main.service";
import {apiEndPoint, siteName} from "../../env";
import {HttpClient} from "@angular/common/http";
import {AssistantComponent} from "../assistant/assistant.component";
import {NotificationViewComponent} from "../notification-view/notification-view.component";
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {AboutComponent} from "../../compoents/about/about.component";
import {MatMenuTrigger, MatMenu, MatMenuItem} from '@angular/material/menu';
import {UserMiniComponent} from '../../user/user-mini/user-mini.component';

import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatDivider} from "@angular/material/divider";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-cue-card',
  templateUrl: './cue-card.component.html',
  styleUrl: './cue-card.component.scss',
  standalone: true,
  imports: [MatButton, MatIcon, UserMiniComponent, MatIconButton, RouterLink, MatMiniFabButton, MatMenuTrigger, MatMenu, MatMenuItem, MatDivider, MatToolbar]
})
export class CueCardComponent implements OnInit, OnDestroy {
  topUserIDs: number[] = [];
  topBarOffset = 0;
  topBarHeight = 74;
  lastScrollTop: number = 0;
  showDivider = signal(true)
  isScrolling = false;
  private resizeSubscription: Subscription = new Subscription();

  constructor(public auth: AuthService, private dialog: MatDialog, public main: MainService, public http: HttpClient, private elementRef: ElementRef, private router: Router) {
    this.lastScrollTop = 0;
  }


  ngOnInit(): void {
    // window.addEventListener('scroll', this.onScrollThrottled);
    this.resizeSubscription = fromEvent(window, 'resize').pipe(
      debounceTime(200),
    ).subscribe(() => {
      this.manageTopUsers()
    })
    this.manageTopUsers()
  }

  ngOnDestroy(): void {
    // window.removeEventListener('scroll', this.onScrollThrottled);
    this.resizeSubscription.unsubscribe();
  }

  backHome() {
    if (this.router.url == '/home') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.backdropClass = 'post-back-drop';
      this.dialog.open(AboutComponent, dialogConfig);
    } else {
      this.router.navigate(['/home']).then();
    }
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
        this.topBarOffset = this.topBarHeight;
      }else {
        this.isScrolling = false;
        return
      }
    } else {
      if (deltaScroll < -20) {
        this.topBarOffset = 0;
      } else {
        this.isScrolling = false;
        return;
      }
    }

    this.elementRef.nativeElement.querySelector('#top-bar').style.top = -this.topBarOffset + 'px';
    this.isScrolling = false;
  }

  // topBarStyle() {
  //   return {
  //     'top': -this.topBarOffset + 'px',
  //     // 'opacity': 1 - this.topBarOffset / this.topBarHeight,
  //   }
  // }

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
