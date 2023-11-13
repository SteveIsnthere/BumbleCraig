import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-ask-tidder',
  templateUrl: './ask-tidder.component.html',
  styleUrls: ['./ask-tidder.component.css']
})
export class AskTidderComponent {
  imageToUpload: File | null = null;
  url: string = "";

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  selectImage(event: any) {
    this.imageToUpload = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = '' + event.target?.result;
    }
  }

  submitVisionQuestion(inputElement: any) {
    let textContent = inputElement.value;
    if (textContent == null) {
      return
    }
    if (this.imageToUpload === null) return;
    const formData = new FormData();
    formData.append('image', this.imageToUpload);
    formData.append('question', textContent);
    this.http.post<string>(apiEndPoint + '/ask_tidder/vision_question/' + this.auth.selfUserID, formData).subscribe(
      (res) => {
        alert(res)
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}
