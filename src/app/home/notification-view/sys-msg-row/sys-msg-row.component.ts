import {Component, Input} from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-sys-msg-row',
    templateUrl: './sys-msg-row.component.html',
    styleUrls: ['./sys-msg-row.component.css'],
    standalone: true,
    imports: [NgIf, MatCard, MatCardHeader, MatCardTitle, MatCardContent]
})
export class SysMsgRowComponent {
  @Input() sysMsg: string = '';
}
