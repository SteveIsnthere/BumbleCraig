import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MainService} from "../../../services/main.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {apiEndPoint} from "../../../env";

@Component({
  selector: 'app-post-section-view',
  templateUrl: './post-section-view.component.html',
  styleUrls: ['./post-section-view.component.css']
})
export class PostSectionViewComponent implements OnInit{
  postIDs: number[] = [];
  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, private _bottomSheet: MatBottomSheet) {
  }
  ngOnInit(): void {
    this.http.get<number[]>(apiEndPoint + '/post/get_recommended_post_ids/1').subscribe((data) => {
      this.postIDs = data;
    })
  }
}
