import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-text-edit-view',
  templateUrl: './text-edit-view.component.html',
  styleUrls: ['./text-edit-view.component.css']
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
