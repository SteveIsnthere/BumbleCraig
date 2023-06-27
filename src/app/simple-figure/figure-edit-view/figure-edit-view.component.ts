import {Component} from '@angular/core';
import {SimpleFigureComponent} from "../simple-figure.component";
import {getLetter} from "../figure-dep";
import {apiEndPoint} from "../../env";

@Component({
  selector: 'app-figure-edit-view',
  templateUrl: './figure-edit-view.component.html',
  styleUrls: ['./figure-edit-view.component.css']
})
export class FigureEditViewComponent extends SimpleFigureComponent {
  selectedFillColor: string = "blue"

  fillPixel(i: number, j: number) {
    this.data[i][j] = this.selectedFillColor
    console.log(this.colorArrayToDataString())
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
      .subscribe((data: any) => {
        console.log(data)
      })
  }
}
