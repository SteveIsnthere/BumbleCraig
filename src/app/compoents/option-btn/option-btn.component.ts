import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-option-btn',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './option-btn.component.html',
  styleUrl: './option-btn.component.scss'
})
export class OptionBtnComponent {
  @Input() isApplication: boolean = false;
}
