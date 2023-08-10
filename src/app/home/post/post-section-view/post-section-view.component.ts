import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {MainService} from "../../../services/main.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {apiEndPoint, rankingModes} from "../../../env";
import {PostSectionOptionsComponent} from "./post-section-options/post-section-options.component";
import {MatDialog} from "@angular/material/dialog";
import {NewPostViewComponent} from "../new-post-view/new-post-view.component";

@Component({
  selector: 'app-post-section-view',
  templateUrl: './post-section-view.component.html',
  styleUrls: ['./post-section-view.component.css']
})
export class PostSectionViewComponent implements OnInit {
  postIDs: number[] = [];
  selectedRankingMode = 'Recommended';
  genreSelected = "All-Genres";

  constructor(public http: HttpClient, public auth: AuthService, public main: MainService, private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.http.get<number[]>(apiEndPoint + '/post/get_recommended_post_ids/' + this.selectedRankingMode + '/' + this.genreSelected + '/' + this.auth.selfUserID).subscribe((data) => {
      this.postIDs = data;
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
      this.ngOnInit();
    });
  }

  openNewPostView() {
    let dialogRef = this.dialog.open(NewPostViewComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  protected readonly rankingModes = rankingModes;
}
