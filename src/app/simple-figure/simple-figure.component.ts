import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {apiEndPoint} from "../env";
import {HttpClient} from "@angular/common/http";
import {convertToColorArray} from "./figure-dep";
import {SimpleFigureCachingService} from "../services/simple-figure-caching.service";


@Component({
  selector: 'app-simple-figure',
  templateUrl: './simple-figure.component.html',
  styleUrls: ['./simple-figure.component.scss'],
  standalone: true,
  imports: []
})
export class SimpleFigureComponent implements OnInit {
  // @Input() figureID: number = 0;
  // @ViewChild('canvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;
  //
  // cellSize:number = 1;
  // loading: boolean = true;
  // data: string[][] = [];
  // width: number = 0;
  //
  //
  // constructor(public http: HttpClient, private elementRef: ElementRef, private cache: SimpleFigureCachingService) {
  // }
  //
  // ngOnInit(): void {
  //   this.width = this.elementRef.nativeElement.offsetWidth;
  //   this.loadFigureData();
  // }
  //
  // loadFigureData(): void {
  //   let cachedData = this.cache.get(this.figureID);
  //
  //   if (cachedData !== '') {
  //     this.data = convertToColorArray(cachedData);
  //     this.renderMap();
  //     this.loading = false;
  //   } else {
  //     this.http.get<string>(apiEndPoint + '/simple_figure/' + this.figureID).subscribe((data) => {
  //       this.data = convertToColorArray(data);
  //       this.cache.set(this.figureID, data);
  //       this.renderMap();
  //       this.loading = false;
  //     });
  //   }
  // }
  //
  // renderMap(): void {
  //   const numRows = this.data.length;
  //   const numCols = this.data[0].length;
  //   let canvas = this.canvasRef!.nativeElement;
  //   let ctx = canvas.getContext('2d')!;
  //   // ctx.imageSmoothingEnabled = false;
  //
  //   this.cellSize = Math.ceil(this.width / numCols) * 2.5;
  //
  //   canvas.width = this.cellSize * numCols;
  //   canvas.height = numRows * this.cellSize;
  //
  //   for (let y = 0; y < numRows; y++) {
  //     for (let x = 0; x < numCols; x++) {
  //       ctx.fillStyle = this.data[y][x];
  //       ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
  //     }
  //   }
  //
  //   // canvas.style.width = this.width + 'px';
  //   // canvas.style.height = this.width + 'px';
  // }

  @Input() figureID: number = 0;
  data: string[][] = [];
  width: number = 0;
  loading: boolean = true;

  constructor(public http: HttpClient, private elementRef: ElementRef, private cache: SimpleFigureCachingService) {
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
}
