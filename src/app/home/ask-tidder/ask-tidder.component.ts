import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint, assistantPrompts, visionPrompts} from "../../env";
import {AuthService} from "../../services/auth.service";

import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-ask-tidder',
  templateUrl: './ask-tidder.component.html',
  styleUrls: ['./ask-tidder.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(100%)'}), // Initial state
        animate('0.5s ease-out', style({opacity: 1, transform: 'translateY(0)'})) // Final state
      ]),
    ])
  ]
})

export class AskTidderComponent {
  imageToUpload: File | null = null;
  url: string = "";
  response: string = "";
  loading: boolean = false;

  examplePrompts: string[][] = assistantPrompts;

  exampleVisionPrompts: string[][] = visionPrompts;

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  selectImage(event: any) {
    this.imageToUpload = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = '' + event.target?.result;
      this.scrollToElement('promptInputField');
    }
  }

  applyPrompt(prompt: string) {
    const promptInputField = document.getElementById('promptInputField') as HTMLInputElement;
    promptInputField.value = prompt;
    this.scrollToElement('promptInputField');
  }

  getVisionResponse(prompt: string) {
    if (this.imageToUpload === null) return;
    const formData = new FormData();
    formData.append('image', this.imageToUpload);
    formData.append('question', prompt);
    this.http.post<string>(apiEndPoint + '/ask_tidder/vision_question/' + this.auth.selfUserID, formData).subscribe(
      (res) => {
        this.setResponse(res)
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  getTextResponse(prompt: string) {
    this.http.post<string>(apiEndPoint + '/ask_tidder/text_question/' + this.auth.selfUserID, prompt).subscribe(
      (res) => {
        this.setResponse(res)
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  setResponse(response: string) {
    this.response = response;
    // this.scrollToElement('response')
    this.loading = false;
  }


  submit(inputElement: any) {
    const textContent = inputElement.value;
    if (textContent == null || textContent === "") {
      return
    }
    this.loading = true;

    if (this.imageToUpload === null) {
      this.getTextResponse(textContent)
    } else {
      this.getVisionResponse(textContent)
    }
  }

  reset() {
    this.imageToUpload = null;
    this.url = "";
    this.response = "";
    this.loading = false;
  }

  scrollToElement(id: string): void {
    setTimeout(() => {
      document.getElementById(id)!.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 100);
  }
}
