import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sys-msg-row',
  templateUrl: './sys-msg-row.component.html',
  styleUrls: ['./sys-msg-row.component.css']
})
export class SysMsgRowComponent {
  @Input() sysMsg: string = '';
}
