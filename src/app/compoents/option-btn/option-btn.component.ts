import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-option-btn',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './option-btn.component.html',
  styleUrl: './option-btn.component.scss'
})
export class OptionBtnComponent {
  @Input() isApplication: boolean = false;
}
