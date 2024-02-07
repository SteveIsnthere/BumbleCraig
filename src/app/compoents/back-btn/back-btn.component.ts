import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
    selector: 'app-back-btn',
    templateUrl: './back-btn.component.html',
    styleUrls: ['./back-btn.component.scss'],
    standalone: true,
    imports: [MatFabButton, MatIcon]
})
export class BackBtnComponent {

}
