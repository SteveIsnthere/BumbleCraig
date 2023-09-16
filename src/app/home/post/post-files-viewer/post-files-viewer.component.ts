import {Component, Input} from '@angular/core';
import {Message} from "../../../chat/group/group-chat-view/Message";

@Component({
  selector: 'app-post-files-viewer',
  templateUrl: './post-files-viewer.component.html',
  styleUrls: ['./post-files-viewer.component.css']
})
export class PostFilesViewerComponent {
  @Input() files: Message[] = [];
  showingFileIndex = 0;


  showBackButton(): boolean {
    return this.showingFileIndex > 0;
  }

  showNextButton(): boolean {
    return this.showingFileIndex < this.files.length - 1;
  }
}
