import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-text-edit-view',
    templateUrl: './text-edit-view.component.html',
    styleUrls: ['./text-edit-view.component.css'],
    standalone: true,
    imports: [MatFormField, MatLabel, MatInput, CdkTextareaAutosize, MatFabButton, MatIcon]
})
export class TextEditViewComponent {
  prompt: string = '';
  // textContent: string | null = null;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public title: string, private http: HttpClient, private bottomSheetRef: MatBottomSheetRef<TextEditViewComponent>) {
    this.prompt = title;
  }

  // changeContent(event: any) {
  //   this.textContent = event.target.value;
  // }


  // upload() {
  //   if (this.textContent == null) {
  //     return
  //   }
  //   this.bottomSheetRef.dismiss(this.textContent);
  // }

  upload(inputElement: any) {
    let textContent = inputElement.value;
    if (textContent == null) {
      return
    }
    this.bottomSheetRef.dismiss(textContent);
  }
}
