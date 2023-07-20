import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Post} from "../Post";
import {apiEndPoint} from "../../../env";

@Component({
  selector: 'app-post-full-view',
  templateUrl: './post-full-view.component.html',
  styleUrls: ['./post-full-view.component.css']
})
export class PostFullViewComponent implements OnInit{
  post: Post | null = null;
  postID: number = 0;
  constructor(public http: HttpClient, public route: ActivatedRoute, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postID = params['id'];
      this.http.get<Post>(apiEndPoint + '/post/get_post/' + this.postID).subscribe((data) => {
        this.post = data;
      })
    });
  }
}
