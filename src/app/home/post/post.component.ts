import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./Post";
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postID: number = 0;
  post: Post | null = null;

  constructor(public http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.postID)
    this.http.get<Post>(apiEndPoint + '/post/get_post/' + this.postID).subscribe((data) => {
      this.post = data;
    })
  }
}
