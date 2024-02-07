import {Component, ElementRef, Inject, Input} from '@angular/core';
import {convertToColorArray, getLetter} from "../figure-dep";
import {apiEndPoint, colors} from "../../env";
import {HttpClient} from "@angular/common/http";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";
import {SimpleFigureCachingService} from "../../services/simple-figure-caching.service";
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';


@Component({
  selector: 'app-figure-edit-view',
  templateUrl: './figure-edit-view.component.html',
  styleUrls: ['./figure-edit-view.component.scss'],
  standalone: true,
  imports: [MatButton, MatIcon, MatFabButton, MatProgressBar]
})
export class FigureEditViewComponent  {
  @Input() figureID: number = 0;
  data: string[][] = [];
  width: number = 0;
  loading: boolean = true;
  selectedFillColor: string = colors[3];
  fileToUpload: File | null = null;

  constructor(private http: HttpClient, @Inject(MAT_BOTTOM_SHEET_DATA) figureID: number, private bottomSheet: MatBottomSheet, private elementRef: ElementRef, private cache: SimpleFigureCachingService) {
    this.figureID = figureID;
  }

  ngOnInit(): void {
    this.width = this.elementRef.nativeElement.offsetWidth;
    let cachedData = this.cache.get(this.figureID);

    if (cachedData != '') {
      // cached data
      this.data = convertToColorArray(cachedData);
      this.loading = false;
      // if (Math.random() < 0.7) {
      //   // f outta here
      //   return
      // }
      setTimeout(() => {
        // delayed fetch
        this.http.get<string>(apiEndPoint + '/simple_figure/' + this.figureID).subscribe((data) => {
          if (data != cachedData) {
            this.data = convertToColorArray(data);
            this.cache.set(this.figureID, data);
            this.loading = false;
          }
        })
      }, 1000 + Math.random() * 3000);
    } else {
      // no cached data
      this.http.get<string>(apiEndPoint + '/simple_figure/' + this.figureID).subscribe((data) => {
        this.data = convertToColorArray(data);
        this.cache.set(this.figureID, data);
        this.loading = false;
      })
    }
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

  uploadFile(event: any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload === null) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.fileToUpload);
    this.http.post<string>(apiEndPoint + "/simple_figure/upload/" + this.figureID, formData).subscribe(
      () => {
        this.fileToUpload = null;
        this.ngOnInit()
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  protected readonly colors = colors;
}
