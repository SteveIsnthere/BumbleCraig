import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {apiEndPoint} from "../env";
import {HttpClient} from "@angular/common/http";
import {convertToColorArray} from "./figure-dep";
import {SimpleFigureCachingService} from "../services/simple-figure-caching.service";

@Component({
  selector: 'app-simple-figure',
  templateUrl: './simple-figure.component.html',
  styleUrls: ['./simple-figure.component.css']
})
export class SimpleFigureComponent implements OnInit {

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
      if (Math.random() < 0.7) {
        // f outta here
        return
      }
      setTimeout(() => {
        // delayed fetch
        this.http.get<string>(apiEndPoint + '/simple_figure/' + this.figureID).subscribe((data) => {
          if (data != cachedData) {
            this.data = convertToColorArray(data);
            this.cache.set(this.figureID, data);
            this.loading = false;
          }
        })
      }, 2000 + Math.random() * 5000);
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
