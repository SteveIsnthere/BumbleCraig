import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-post-section-options',
  templateUrl: './post-section-options.component.html',
  styleUrls: ['./post-section-options.component.css']
})
export class PostSectionOptionsComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheet: MatBottomSheetRef<PostSectionOptionsComponent>) {
    this.selectedRankingMode = data[0];
    this.genreSelected = data[1];
  }

  rankingModes = [
    'Recommended',
    'Trending',
    'Newest',
    'Best',
    'Worst',
    'Friends',
  ];
  selectedRankingMode = this.rankingModes[0];
  genres = [
    'All-Genres',
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
  ];
  genreSelected = this.genres[0];

  closeBottomSheet() {
    //  pass the data to parent when bottom sheet closes.
    this.bottomSheet.dismiss([this.selectedRankingMode, this.genreSelected]);
  }

  selectGenre(genre: string) {
    this.genreSelected = genre;
  }

  selectRankingMode(rankingMode: string) {
    this.selectedRankingMode = rankingMode;
  }
}
