import {Component, Input} from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';


@Component({
    selector: 'app-sys-msg-row',
    templateUrl: './sys-msg-row.component.html',
    styleUrls: ['./sys-msg-row.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent]
})
export class SysMsgRowComponent {
  @Input() sysMsg: string = '';
}
