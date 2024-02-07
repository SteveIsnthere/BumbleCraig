import { Component } from '@angular/core';
import {UserComponent} from "../user.component";
import { SimpleFigureComponent } from '../../simple-figure/simple-figure.component';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-user-mini',
    templateUrl: './user-mini.component.html',
    styleUrls: ['./user-mini.component.scss'],
    standalone: true,
    imports: [RouterLink, SimpleFigureComponent]
})
export class UserMiniComponent extends UserComponent{

}
