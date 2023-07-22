import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../Post";
import {apiEndPoint} from "../../../env";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-post-comments-view',
  templateUrl: './post-comments-view.component.html',
  styleUrls: ['./post-comments-view.component.css']
})
export class PostCommentsViewComponent implements OnInit {
  postID: number = 0;
  comments: Comment[] = [];

  constructor(private http: HttpClient, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.postID = data;
  }

  ngOnInit(): void {
    this.http.get<Comment[]>(apiEndPoint + '/post/get_comments/' + this.postID).subscribe(comments => {
      this.comments = comments;
    })
  }
}
