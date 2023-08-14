import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
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

  nameGood: boolean = false;
  passwordGood: boolean = false;

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', [Validators.minLength(5), Validators.maxLength(20)]],
  });

  secondFormGroup = this._formBuilder.group({
    passwordCtrl: ['', Validators.minLength(8)],
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
    if (this.inputName.length > nameMaxLength) {
      this.inputName = this.inputName.slice(0, nameMaxLength);
      this._snackBar.open('Name too long', 'Understood', {
        duration: 2000,
      });
      return;
    }

    if (this.inputName.length < 5) {
      this._snackBar.open('Name too short', 'Understood', {
        duration: 2000,
      });
      return;
    }

    if (!this.firstFormGroup.valid) return;


    this.http.post<string>(apiEndPoint + '/user/name/' + this.auth.selfUserID, this.inputName).subscribe((res) => {
      if (res == 'Name successfully changed') {
        this.openSnackBar(res, 'close');
        this.nameGood = true;
      }
    });
  }

  changePassword(event: any) {
    this.inputPassword = event.target.value;
  }

  updatePassword() {
    if (this.inputPassword.length < 8) {
      this.openSnackBar('Password must be at least 8 characters', 'close');
      return;
    }

    if (!this.secondFormGroup.valid) return;

    this.http.post<string>(apiEndPoint + '/user/password/' + this.auth.selfUserID, this.inputPassword).subscribe((res) => {
      this.openSnackBar(res, 'close');
      this.passwordGood = true;
    });
  }

  changeEmail(event: any) {
    this.inputEmail = event.target.value;
  }

  updateEmail() {
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(this.inputEmail)) {
      this.openSnackBar('Invalid email', 'close');
      return;
    }
    this.http.post<string>(apiEndPoint + '/user/email/' + this.auth.selfUserID, this.inputEmail).subscribe((res) => {
      this.openSnackBar(res, 'close');
    });
  }


  confirmSetup() {
    if (!this.nameGood) {
      this.openSnackBar('Please update your name again', 'close')
      return;
    }
    if (!this.passwordGood) {
      this.openSnackBar('Please update your password again', 'close')
      return;
    }
    this.http.get(apiEndPoint + '/user/setup_visitor/' + this.auth.selfUserID).subscribe(() => {
      this.auth.loginUsingSessionPassword()
      this.openSnackBar('Account setup complete', 'close')
      this.dialogRef.close();
    })
  }


  selectionChange($event: StepperSelectionEvent) {
    if ($event.selectedIndex === 2 && $event.previouslySelectedIndex === 1) {
      this.updatePassword();
    } else if ($event.selectedIndex === 1 && $event.previouslySelectedIndex === 0) {
      this.updateName();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 4000});
  }
}
