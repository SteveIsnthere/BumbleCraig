import {Component} from '@angular/core';
import {Post} from "../../home/post/Post";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {apiEndPoint} from "../../env";
import {StepperSelectionEvent} from "@angular/cdk/stepper";

@Component({
  selector: 'app-user-set-up',
  templateUrl: './user-set-up.component.html',
  styleUrls: ['./user-set-up.component.css']
})
export class UserSetUpComponent {
  inputName: string = '';
  inputPassword: string = '';
  inputEmail: string = '';

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', [Validators.required, Validators.min(3), Validators.max(20)]],
  });

  secondFormGroup = this._formBuilder.group({
    passwordCtrl: ['', [Validators.required, Validators.min(8)]],
  });


  constructor(public http: HttpClient, public auth: AuthService, public dialogRef: MatDialogRef<UserSetUpComponent>, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }


  changeName(event: any) {
    this.inputName = event.target.value;
  }

  updateName() {
    const nameMaxLength = 20;
    if (!this.firstFormGroup.valid) return;
    if (this.inputName.length > nameMaxLength) {
      this.inputName = this.inputName.slice(0, nameMaxLength);
      this._snackBar.open('Name too long, will be trimmed', 'Understood', {
        duration: 2000,
      });
    }

    this.http.post<string>(apiEndPoint + '/user/name/' + this.auth.selfUserID, this.inputName).subscribe((res) => {
      if (res == 'Name successfully changed') {
        this.openSnackBar(res, 'close');
      }
    });
  }

  changePassword(event: any) {
    this.inputPassword = event.target.value;
  }

  updatePassword() {
    if (!this.secondFormGroup.valid) return;

    if (this.inputPassword.length < 8) {
      this.openSnackBar('Password must be at least 8 characters', 'close');
      return;
    }
    this.http.post<string>(apiEndPoint + '/user/password/' + this.auth.selfUserID, this.inputPassword).subscribe((res) => {
      this.openSnackBar(res, 'close');
    });
  }

  changeEmail(event: any) {
    this.inputEmail = event.target.value;
  }

  updateEmail() {
    this.http.post<string>(apiEndPoint + '/user/email/' + this.auth.selfUserID, this.inputEmail).subscribe((res) => {
      this.openSnackBar(res, 'close');
    });
  }


  confirmSetup() {

  }


  selectionChange($event: StepperSelectionEvent) {
    if ($event.selectedIndex === 2 && $event.previouslySelectedIndex === 1) {
      this.updateName();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000});
  }
}
