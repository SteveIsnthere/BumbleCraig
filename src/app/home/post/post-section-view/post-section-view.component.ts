import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MainService} from "../../../services/main.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {apiEndPoint} from "../../../env";
import {PostSectionOptionsComponent} from "./post-section-options/post-section-options.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-post-section-view',
  templateUrl: './post-section-view.component.html',
  styleUrls: ['./post-section-view.component.css']
})
export class PostSectionViewComponent implements OnInit {
  postIDs: number[] = [];
  loading = true;
  empty = false;
  selectedRankingMode = 'Recommended';
  genreSelected = "All-Genres";
  canShowReloadButton = false;
  showReloadButton = false;
  firstLoad = true;
  showPostSection = true;

  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {
    this.main.appReopenEvent.subscribe(() => {
      if (this.canShowReloadButton) {
        this.showReloadButton = true;
      }
    })
    this.main.postReloadEvent.subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.showReloadButton = false;
    this.canShowReloadButton = false;
    this.loading = true;
    this.loadSettingsFromLocalStorage();
    this.http.get<number[]>(apiEndPoint + '/post/get_recommended_post_ids/' + this.selectedRankingMode + '/' + this.genreSelected + '/' + this.auth.selfUserID).subscribe((data) => {
      this.loading = false;
      this.postIDs = data;
      this.empty = this.postIDs.length == 0;
      setTimeout(() => {
        this.canShowReloadButton = true;
      }, 15000);

      if (this.firstLoad) {
        this.firstLoad = false;
      } else {
        this.showPostSection = false;
        setTimeout(() => {
          this.showPostSection = true;
        }, 10);
      }
    })
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(PostSectionOptionsComponent, {
      data: [this.selectedRankingMode, this.genreSelected],
    });

    // subscribe to observable that emit event when bottom sheet closes
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      // update the selectedRankingMode and genreSelected
      if (dataFromChild == undefined) return;
      this.selectedRankingMode = dataFromChild[0];
      this.genreSelected = dataFromChild[1];

      // update the postIDs
      this.saveSettingsToLocalStorage();
      this.ngOnInit();
    });
  }

  loadSettingsFromLocalStorage() {
    // first check if the local storage is empty
    let storedRankingMode = localStorage.getItem('rankingMode');
    let storedGenre = localStorage.getItem('genre');
    if (storedRankingMode == null || storedGenre == null) return;

    // update the selectedRankingMode and genreSelected
    this.selectedRankingMode = storedRankingMode;
    this.genreSelected = storedGenre;
  }

  saveSettingsToLocalStorage() {
    localStorage.setItem('rankingMode', this.selectedRankingMode);
    localStorage.setItem('genre', this.genreSelected);
  }
}
