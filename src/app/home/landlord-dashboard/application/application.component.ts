import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Application} from "../Application";
import {apiEndPoint} from "../../../env";
import {UserComponent} from "../../../user/user.component";
import {MatFabButton} from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    UserComponent,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
  @Input() applicationID: number = 0;
  accepted: boolean = false;
  rejected: boolean = false;
  application: Application | undefined = undefined;
  description: string = "";
  creditScore: number = 0;

  constructor(private http: HttpClient, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.http.get<Application>(`${apiEndPoint}/application/get_application_by_id/${this.applicationID}`).subscribe(application => {
      this.application = application;
      this.http.get<string>(apiEndPoint + '/user/description/' + this.application.user_id).subscribe((data) => {
        this.description = data;
      });
      this.http.get<number>(apiEndPoint + '/user/credit_score/' + this.application.user_id).subscribe((data) => {
        this.creditScore = data;
      })
    });
  }

  acceptApplication() {
    this.http.get(`${apiEndPoint}/application/accept_application/${this.applicationID}/${this.auth.selfUserID}`).subscribe(() => {
      this.accepted = true;
    });
  }

  rejectApplication() {
    this.http.get(`${apiEndPoint}/application/reject_application/${this.applicationID}/${this.auth.selfUserID}`).subscribe(() => {
      this.rejected = true;
    });
  }
}
