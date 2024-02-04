import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../../env";
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    standalone: true,
    imports: [MatMiniFabButton, MatIcon]
})
export class FileUploadComponent {
  @Input() uploadRoute: string | null = null;
  fileToUpload: File | null = null;

  constructor(private http: HttpClient) {
  }

  uploadFile(event: any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload === null || this.uploadRoute === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.http.post<string>(apiEndPoint + this.uploadRoute, formData).subscribe(
      () => {
        this.fileToUpload = null;
        console.log('File uploaded successfully');
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}
