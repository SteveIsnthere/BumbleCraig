import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {apiEndPoint} from "../env";
import {HttpClient} from "@angular/common/http";
import {convertToColorArray} from "./figure-dep";
import {SimpleFigureCachingService} from "../services/simple-figure-caching.service";
import {NgIf, NgFor} from '@angular/common';

@Component({
  selector: 'app-simple-figure',
  templateUrl: './simple-figure.component.html',
  styleUrls: ['./simple-figure.component.css'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class SimpleFigureComponent implements OnInit {
  @Input() figureID: number = 0;
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> | null = null;

  ctx: CanvasRenderingContext2D | null = null;
  cellSize = 1;
  loading: boolean = true;
  data: string[][] = [];
  width: number = 0;


  constructor(public http: HttpClient, private elementRef: ElementRef, private cache: SimpleFigureCachingService) {
  }

  ngOnInit(): void {
    this.width = this.elementRef.nativeElement.offsetWidth;
    this.ctx = this.canvasRef!.nativeElement.getContext('2d');
    // this.ctx!.imageSmoothingEnabled = false;
    this.loadFigureData();
  }

  loadFigureData(): void {
    let cachedData = this.cache.get(this.figureID);

    if (cachedData !== '') {
      this.data = convertToColorArray(cachedData);
      this.renderMap();
      this.loading = false;
    } else {
      this.http.get<string>(apiEndPoint + '/simple_figure/' + this.figureID).subscribe((data) => {
        this.data = convertToColorArray(data);
        this.cache.set(this.figureID, data);
        this.renderMap();
        this.loading = false;
      });
    }
  }

  renderMap(): void {
    const numRows = this.data.length;
    const numCols = this.data[0].length;
    const canvas = this.canvasRef!.nativeElement;

    this.cellSize = Math.ceil(this.width / numCols) * 2.5;

    canvas.width = this.cellSize * numCols;
    canvas.height = numRows * this.cellSize;

    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        this.ctx!.fillStyle = this.data[y][x];
        this.ctx!.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }
}
