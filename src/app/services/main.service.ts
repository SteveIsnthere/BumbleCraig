import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {GroupInvitation} from "../home/notification-view/groupInvitation";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {apiEndPoint} from "../env";
import {StatesService} from "./states.service";

export interface PostLikes {
  post_id: string
  number_of_likes: number
}

export interface PostComments {
  post_id: string
  number_of_comments: number
}

export interface Notification {
  friend_request_user_ids: [number]
  group_invites: [GroupInvitation]
  post_likes: [PostLikes]
  post_comments: [PostComments]
  system_messages: [string]
}

@Injectable({
  providedIn: 'root'
})
export class MainService implements OnDestroy {
  notifications: Notification | null = null;
  fetchNotificationsInterval: any = null;

  @Output() appReopenEvent = new EventEmitter<string>()
  @Output() postReloadEvent = new EventEmitter<string>()

  constructor(public http: HttpClient, public auth: AuthService, public states: StatesService) {
    this.setupFetchNotificationsInterval()
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === "visible") {
        this.appReopenEvent.emit("app-reopened")
        this.fetchNotifications()
      }
    })
  }

  reloadPosts(): void {
    this.postReloadEvent.emit("reload-posts")
  }

  setupFetchNotificationsInterval(): void {
    this.fetchNotifications()
    this.fetchNotificationsInterval = setInterval(() => {
      this.fetchNotifications()
    }, 10000)
  }

  clearFetchNotificationsInterval(): void {
    clearInterval(this.fetchNotificationsInterval)
  }

  fetchNotifications(): void {
    this.http.get<Notification>(apiEndPoint + '/notification/fetch_all_notifications/' + this.auth.selfUserID).subscribe((data) => {
      this.notifications = data;
    })
    this.http.get<boolean>(apiEndPoint + '/group/have_unread_msg/' + this.auth.selfUserID).subscribe((data) => {
      this.states.hasUnreadMsg = data;
    })
  }

  getTotalMessageCount(): number {
    let total = 0;
    total += this.notifications?.friend_request_user_ids.length ?? 0;
    total += this.notifications?.group_invites.length ?? 0;
    total += this.notifications?.post_likes.length ?? 0;
    total += this.notifications?.post_comments.length ?? 0;
    total += this.notifications?.system_messages.length ?? 0;
    return total;
  }

  ngOnDestroy(): void {
    this.clearFetchNotificationsInterval()
  }
}
