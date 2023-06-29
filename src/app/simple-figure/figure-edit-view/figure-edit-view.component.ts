import {Component, Inject} from '@angular/core';
import {SimpleFigureComponent} from "../simple-figure.component";
import {getLetter} from "../figure-dep";
import {apiEndPoint, colors} from "../../env";
import {HttpClient} from "@angular/common/http";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-figure-edit-view',
  templateUrl: './figure-edit-view.component.html',
  styleUrls: ['./figure-edit-view.component.css']
})
export class FigureEditViewComponent extends SimpleFigureComponent {
  selectedFillColor: string = "blue"

  constructor(http: HttpClient, @Inject(MAT_BOTTOM_SHEET_DATA) figureID: number, private bottomSheet: MatBottomSheet) {
    super(http);
    this.figureID = figureID;
  }

  fillPixel(i: number, j: number) {
    this.data[i][j] = this.selectedFillColor
  }

  colorArrayToDataString() {
    let result = ""
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        result += getLetter(this.data[i][j])
      }
    }
    return result
  }

  save() {
    this.http.put(apiEndPoint + "/simple_figure/" + this.figureID,
      this.colorArrayToDataString())
      .subscribe(() => {
        console.log('saved')
        this.bottomSheet.dismiss();
      })
  }

  protected readonly colors = colors;
}
