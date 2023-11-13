import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";

@Component({
  selector: 'app-ask-tidder',
  templateUrl: './ask-tidder.component.html',
  styleUrls: ['./ask-tidder.component.css']
})
export class AskTidderComponent {
  uploadRoute: string = "";
  imageToUpload: File | null = null;
  url: string = "";

  constructor(private http: HttpClient) {
  }

  selectImage(event: any) {
    this.imageToUpload = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = '' + event.target?.result;
    }
  }

  uploadFile(event: any) {
    this.imageToUpload = event.target.files[0];
    if (this.imageToUpload === null || this.uploadRoute === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.imageToUpload);
    this.http.post<string>(apiEndPoint + this.uploadRoute, formData).subscribe(
      () => {
        this.imageToUpload = null;
        console.log('File uploaded successfully');
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  upload(inputElement: any) {
    let textContent = inputElement.value;
    if (textContent == null) {
      return
    }
  }
}
