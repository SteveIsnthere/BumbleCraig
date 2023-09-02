import {Component, OnInit, ViewChild} from '@angular/core';
import {UserComponent} from "../user.component";
import {apiEndPoint} from "../../env";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FigureEditViewComponent} from "../../simple-figure/figure-edit-view/figure-edit-view.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EssentialUserData} from "../UserModel";

@Component({
  selector: 'app-user-edit-view',
  templateUrl: './user-edit-view.component.html',
  styleUrls: ['./user-edit-view.component.css']
})
export class UserEditViewComponent extends UserComponent implements OnInit {
  @ViewChild('figure', {static: false}) figureComponent: any;
  userDescription = 'loading...';
  userEmail = 'loading...';
  userPassword = 'loading...';
  inputDescription = '';
  inputName = '';
  inputEmail = '';
  inputPassword = '';
  hidePassword = true;


  constructor(http: HttpClient, public auth: AuthService, private _bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar) {
    super(http);
    this.userID = this.auth.selfUserID;
  }

  override ngOnInit(): void {
    this.http.get<EssentialUserData>(apiEndPoint + '/user/' + this.userID).subscribe((data) => {
      this.essentialUserData = data;
      this.inputName = this.essentialUserData.name;
    })

    this.http.get<string>(apiEndPoint + '/user/description/' + this.userID).subscribe((data) => {
      this.userDescription = data;
      this.inputDescription = this.userDescription;
    });

    this.http.get<string>(apiEndPoint + '/user/email/' + this.userID).subscribe((data) => {
      this.userEmail = data;
      this.inputEmail = this.userEmail;
    })

    this.http.get<string>(apiEndPoint + '/user/password/' + this.userID).subscribe((data) => {
      this.userPassword = data;
      this.inputPassword = this.userPassword;
    })
  }

  editFigure(): void {
    const bottomSheetRef = this._bottomSheet.open(FigureEditViewComponent, {data: this.essentialUserData.figure_id});
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.figureComponent.ngOnInit();
    });
  }

  // name
  changeInputName(event: any) {
    this.inputName = event.target.value;
  }

  saveName(): void {
    const nameMaxLength = 20;
    if (this.inputName.length > nameMaxLength) {
      this.inputName = this.inputName.slice(0, nameMaxLength);
    }

    if (this.inputName.length == 0) {
      this.openSnackBar('Huh?', 'close')
      return;
    }

    this.http.post<string>(apiEndPoint + '/user/name/' + this.userID, this.inputName).subscribe((res) => {
      if (res == 'Name successfully changed') {
        this.essentialUserData.name = this.inputName;
      }
      this.openSnackBar(res, 'close');
    });
  }

  // description
  changeInputDescription(event: any) {
    this.inputDescription = event.target.value;
  }

  saveDescription(): void {
    let noError = true;
    const descriptionMaxLength = 100;
    if (this.inputDescription.length > descriptionMaxLength) {
      this.inputDescription = this.inputDescription.slice(0, descriptionMaxLength);
      this.openSnackBar('TL-NC: TOO DAMN LONG NO BODY CARES', 'close');
      noError = false;
    }

    if (this.inputDescription.length == 0) {
      this.inputDescription = 'I am a lazy walnut';
      this.openSnackBar('YOU ARE A LAZY WALNUT', 'close');
      noError = false;
    }
    this.http.post(apiEndPoint + '/user/description/' + this.userID, this.inputDescription).subscribe(() => {
      this.userDescription = this.inputDescription;
      if (noError) {
        this.openSnackBar('Description changed', 'close');
      }
    });
  }

  // email
  changeInputEmail(event: any) {
    this.inputEmail = event.target.value;
  }

  saveEmail(): void {
    // check if email is valid
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(this.inputEmail)) {
      this.openSnackBar('Invalid email', 'close');
      return;
    }
    this.http.post<string>(apiEndPoint + '/user/email/' + this.userID, this.inputEmail).subscribe((res) => {
      this.userEmail = this.inputEmail;
      this.openSnackBar(res, 'close');
    });
  }

  // password
  changeInputPassword(event: any) {
    this.inputPassword = event.target.value;
  }

  savePassword(): void {
    if (this.inputPassword.length < 8) {
      this.openSnackBar('Password must be at least 8 characters', 'close');
      return;
    }
    this.http.post<string>(apiEndPoint + '/user/password/' + this.userID, this.inputPassword).subscribe((res) => {
      this.userPassword = this.inputPassword;
      this.openSnackBar(res, 'close');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000});
  }
}
