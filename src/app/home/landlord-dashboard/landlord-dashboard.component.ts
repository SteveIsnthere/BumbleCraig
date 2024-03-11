import {Component, OnInit} from '@angular/core';
import {ApplicationComponent} from "./application/application.component";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {apiEndPoint} from "../../env";
import {PostComponent} from "../post/post.component";
import {MatButton} from "@angular/material/button";

interface PostidAndApplicationids {
  postID: number;
  applicationIDs: number[];
}

@Component({
  selector: 'app-landlord-dashboard',
  standalone: true,
  imports: [
    ApplicationComponent,
    PostComponent,
    MatButton
  ],
  templateUrl: './landlord-dashboard.component.html',
  styleUrl: './landlord-dashboard.component.scss'
})
export class LandlordDashboardComponent implements OnInit {
  mainData: PostidAndApplicationids[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit() {
    this.http.get<number[]>(apiEndPoint + '/post/get_post_ids_of_user/' + this.auth.selfUserID).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.mainData.push({postID: data[i], applicationIDs: []});
      }

      for (let i = 0; i < data.length; i++) {
        this.http.get<number[]>(apiEndPoint + '/application/get_applications_of_post/' + data[i]).subscribe((data) => {
          this.mainData[i].applicationIDs = data;
        })
      }
    })
  }

  mostApplicationsFirst() {
    this.mainData.sort((a, b) => {
      return b.applicationIDs.length - a.applicationIDs.length;
    });
  }

}
