import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {apiEndPoint} from "../../../env";

@Component({
  selector: 'app-liked-posts-view',
  templateUrl: './liked-posts-view.component.html',
  styleUrl: './liked-posts-view.component.css'
})
export class LikedPostsViewComponent implements OnInit {
  postIDs: number[] = [];
  loading = true;
  empty = false;

  constructor(public http: HttpClient, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.loading = true;
    this.http.get<number[]>(apiEndPoint + '/post/get_post_ids_liked_by_user/' + this.auth.selfUserID).subscribe((data) => {
      if (data != this.postIDs) {
        this.loading = false;
        this.postIDs = data;
      }

      this.empty = this.postIDs.length == 0;
    })
  }
}
