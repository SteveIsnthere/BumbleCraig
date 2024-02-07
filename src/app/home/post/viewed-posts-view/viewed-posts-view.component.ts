import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {apiEndPoint} from "../../../env";
import { LoadingPlaceholderComponent } from '../../../compoents/loading-placeholder/loading-placeholder.component';
import { PostSectionViewBaseComponent } from '../post-section-view/post-section-view-base/post-section-view-base.component';


@Component({
    selector: 'app-viewed-posts-view',
    templateUrl: './viewed-posts-view.component.html',
    styleUrl: './viewed-posts-view.component.css',
    standalone: true,
    imports: [PostSectionViewBaseComponent, LoadingPlaceholderComponent]
})
export class ViewedPostsViewComponent implements OnInit {
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
    this.http.get<number[]>(apiEndPoint + '/post/get_post_ids_viewed_by_user/' + this.auth.selfUserID).subscribe((data) => {
      if (data != this.postIDs) {
        this.loading = false;
        this.postIDs = data;
      }

      this.empty = this.postIDs.length == 0;
    })
  }
}
