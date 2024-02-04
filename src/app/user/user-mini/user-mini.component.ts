import { Component } from '@angular/core';
import {UserComponent} from "../user.component";
import { SimpleFigureComponent } from '../../simple-figure/simple-figure.component';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-user-mini',
    templateUrl: './user-mini.component.html',
    styleUrls: ['./user-mini.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink, SimpleFigureComponent]
})
export class UserMiniComponent extends UserComponent{

}
