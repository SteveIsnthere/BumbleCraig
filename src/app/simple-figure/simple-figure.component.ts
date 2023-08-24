import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {apiEndPoint} from "../env";
import {HttpClient} from "@angular/common/http";
import {convertToColorArray} from "./figure-dep";

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

  constructor(public http: HttpClient, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.width = this.elementRef.nativeElement.offsetWidth;
    this.http.get<string>(apiEndPoint + '/simple_figure/' + this.figureID).subscribe((data) => {
      this.data = convertToColorArray(data);
      this.loading = false;
    })
  }
}
