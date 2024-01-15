import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MainService} from "../../../services/main.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {apiEndPoint} from "../../../env";
import {MatDialog} from "@angular/material/dialog";
import {StatesService} from "../../../services/states.service";
import {rankingModes} from "../../../env";
import {genres} from "../../../env";

@Component({
  selector: 'app-post-section-view',
  templateUrl: './post-section-view.component.html',
  styleUrls: ['./post-section-view.component.css']
})

export class PostSectionViewComponent implements OnInit {
  postIDs: number[] = [];

  loading = true;
  empty = false;
  selectedRankingMode: string[] = rankingModes[0];
  genreSelected = genres[0];
  canShowReloadButton = false;
  showReloadButton = false;
  showPostSection = true;
  // isChecked = false;
  cacheKey: string = 'post-ids-cache';
  showRequestMorePostsButton = false;

  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, private _bottomSheet: MatBottomSheet, public dialog: MatDialog, public states: StatesService) {
    this.main.appReopenEvent.subscribe(() => {
      if (this.canShowReloadButton) {
        this.showReloadButton = true;
      }
    })
    this.main.postReloadEvent.subscribe(() => {
      this.fetchPosts();
    })
  }

  ngOnInit(): void {
    this.showReloadButton = false;
    this.canShowReloadButton = false;
    this.loading = true;
    this.loadSettingsFromLocalStorage();

    // subscribe to the resize event

    if (this.states.loadedUp) {
      this.loadPostIDsFromLocalStorage();
      this.showReloadButton = true;
      return;
    }

    this.fetchPosts();
  }

  fetchPosts() {
    this.showReloadButton = false;
    this.loading = true;
    this.canShowReloadButton = false;
    this.http.get<number[]>(apiEndPoint + '/post/get_recommended_post_ids/' + this.selectedRankingMode[0] + '/' + this.genreSelected + '/' + this.auth.selfUserID).subscribe((data) => {
      if (data != this.postIDs) {
        this.loading = false;
        this.postIDs = data;
        this.savePostIDsToLocalStorage();
      }

      this.empty = this.postIDs.length == 0;
      setTimeout(() => {
        this.canShowReloadButton = true;
      }, 15000);
    })
  }

  fetchMorePosts() {
    this.showReloadButton = false;
    this.loading = true;
    this.canShowReloadButton = false;
    this.http.get<number[]>(apiEndPoint + '/post/get_extra_post_ids/' + this.auth.selfUserID).subscribe((data) => {
      if (data != this.postIDs) {
        this.loading = false;
        this.postIDs = data;
        this.savePostIDsToLocalStorage();
      }

      this.empty = this.postIDs.length == 0;
      setTimeout(() => {
        this.canShowReloadButton = true;
      }, 15000);
    })
  }


  // openBottomSheet(): void {
  //   const bottomSheetRef = this._bottomSheet.open(PostSectionOptionsComponent, {
  //     data: [this.selectedRankingMode, this.genreSelected],
  //   });
  //
  //   // subscribe to observable that emit event when bottom sheet closes
  //   bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
  //     // update the selectedRankingMode and genreSelected
  //     if (dataFromChild == undefined) return;
  //     this.selectedRankingMode = dataFromChild[0];
  //     this.genreSelected = dataFromChild[1];
  //
  //     // update the postIDs
  //     this.saveSettingsToLocalStorage();
  //     this.fetchPosts();
  //   });
  // }

  loadSettingsFromLocalStorage() {
    // first check if the local storage is empty
    let storedRankingMode = localStorage.getItem('rankingMode');
    let storedGenre = localStorage.getItem('genre');
    if (storedRankingMode != null && rankingModes.includes(JSON.parse((storedRankingMode)))) this.selectedRankingMode = JSON.parse(storedRankingMode);
    if (storedGenre != null && genres.includes(storedGenre)) this.genreSelected = storedGenre;
  }

  saveSettingsToLocalStorage() {
    localStorage.setItem('genre', this.genreSelected);
    localStorage.setItem('rankingMode', JSON.stringify(this.selectedRankingMode));
    this.fetchPosts();
  }

  refresh() {
    // reload the site
    this.fetchPosts()
  }

  private loadPostIDsFromLocalStorage(): void {
    const cachedData = localStorage.getItem(this.cacheKey);
    if (cachedData) {
      this.postIDs = JSON.parse(cachedData);
      this.loading = false;
    } else {
      this.fetchPosts();
    }
  }

  private savePostIDsToLocalStorage(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.postIDs));
  }

  setRankingMode(mode: string[]) {
    this.selectedRankingMode = mode;
    this.saveSettingsToLocalStorage()
  }

  setGenre(genre: string) {
    this.genreSelected = genre;
    this.saveSettingsToLocalStorage()
  }

  protected readonly rankingModes = rankingModes;
  protected readonly genres = genres;
}
