import {EventEmitter, Injectable, Output} from '@angular/core';
import {GroupInvitation} from "../home/notification-view/groupInvitation";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {apiEndPoint} from "../env";
import {StatesService} from "./states.service";
import {forkJoin, map, Observable, of} from "rxjs";


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
export class MainService {
  notifications: Notification | null = null;
  shouldFetchNotifications = true;

  @Output() appReopenEvent = new EventEmitter<string>()
  @Output() postReloadEvent = new EventEmitter<string>()

  constructor(public http: HttpClient, public auth: AuthService, public states: StatesService) {
    this.setupFetchNotificationsInterval()

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === "visible") {
        this.appReopenEvent.emit("app-reopened")
        this.fetchNotifications().subscribe()
      }
    })

    auth.loginEvent.subscribe(() => {
      this.fetchNotifications().subscribe()
    })
  }

  reloadPosts(): void {
    this.postReloadEvent.emit("reload-posts")
  }

  setupFetchNotificationsInterval(): void {
    this.fetchNotifications().subscribe(() => {
        setTimeout(() => {
          this.setupFetchNotificationsInterval()
        }, 7500)
      }
    )
  }

  fetchNotifications(override = false): Observable<boolean> {
    if (!this.auth.loggedIn || !this.shouldFetchNotifications && !override) {
      return of(true);
    }

    const notificationRequest = this.http.get<Notification>(apiEndPoint + '/notification/fetch_all_notifications/' + this.auth.selfUserID);
    const unreadMsgRequest = this.http.get<boolean>(apiEndPoint + '/group/have_unread_msg/' + this.auth.selfUserID);

    return forkJoin({
      notifications: notificationRequest,
      unreadMsg: unreadMsgRequest
    }).pipe(
      map((results: { notifications: Notification, unreadMsg: boolean }) => {
        if (this.notifications !== results.notifications) {
          this.notifications = results.notifications;
        }
        if (this.states.hasUnreadMsg !== results.unreadMsg) {
          this.states.hasUnreadMsg = results.unreadMsg;
        }
        return true; // Both requests completed successfully
      })
    );
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
}
