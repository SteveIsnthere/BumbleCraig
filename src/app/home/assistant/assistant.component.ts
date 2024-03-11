import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint, assistantPrompts, siteName, visionPrompts} from "../../env";
import {AuthService} from "../../services/auth.service";

import {animate, style, transition, trigger} from "@angular/animations";
import {MatProgressBar} from '@angular/material/progress-bar';
import {LogoComponent} from '../../compoents/logo/logo.component';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatInput} from '@angular/material/input';
import {MatFormField, MatLabel} from '@angular/material/form-field';

import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatDialogContent, MatDialogClose, MatDialogActions} from '@angular/material/dialog';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BackgroundComponent} from "../../compoents/background/background.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(100%)'}),
        animate('0.5s ease-out', style({opacity: 1, transform: 'translateY(0)'})) // Final state
      ]),
    ])
  ],
  standalone: true,
  imports: [MatDialogContent, MatButton, MatDialogClose, MatIcon, MatFormField, MatLabel, MatInput, CdkTextareaAutosize, LogoComponent, MatProgressBar, MatFabButton, MatDialogActions, MatProgressSpinner, BackgroundComponent, ReactiveFormsModule, FormsModule]
})

export class AssistantComponent {
  imageToUpload: File | null = null;
  url: string = "";
  response: string = "";
  loading: boolean = false;
  assistantView = false;
  searchValue: string = '';
  @ViewChild('input') promptInputField!: ElementRef;


  examplePrompts: string[] = assistantPrompts;

  exampleVisionPrompts: string[] = visionPrompts;

  constructor(private http: HttpClient, private auth: AuthService, private main: MainService) {
    let maxExamples = 4;
    // randomize examples
    if (this.examplePrompts.length > maxExamples) {
      this.examplePrompts.sort(() => Math.random() - 0.5);
      this.examplePrompts = this.examplePrompts.slice(0, maxExamples);
    }
    if (auth.isLandlord){
      this.assistantView = true;
    }
  }

  search() {
    this.main.searchTerms = this.searchValue;
    this.main.reloadPosts();
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
    this.http.post<string>(apiEndPoint + '/assistant/vision_question/' + this.auth.selfUserID, formData).subscribe(
      (res) => {
        this.setResponse(res)
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  getTextResponse(prompt: string) {
    this.http.post<string>(apiEndPoint + '/assistant/text_question/' + this.auth.selfUserID, prompt).subscribe(
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


  submit() {
    const textContent = this.promptInputField.nativeElement.value;
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

  protected readonly siteName = siteName;
}
