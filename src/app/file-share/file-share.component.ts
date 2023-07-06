import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.css']
})
export class FileShareComponent {
@Input() fileShareID: number = 0;
}
