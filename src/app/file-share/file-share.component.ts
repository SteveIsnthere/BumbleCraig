import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../env";
import {MatDialog} from "@angular/material/dialog";
import {ImageFullViewComponent} from "./image-full-view/image-full-view.component";
import {animate, style, transition, trigger} from "@angular/animations";
import { MatIcon } from '@angular/material/icon';


export interface FileShareInfo {
  file_share_id: number,
  file_name: string,
  file_size: number,
}

@Component({
    selector: 'app-file-share',
    templateUrl: './file-share.component.html',
    styleUrls: ['./file-share.component.css'],
    animations: [
        trigger('inAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1.2s ease-out', style({ opacity: 1 })) // Final state
            ]),
        ])
    ],
    standalone: true,
    imports: [MatIcon]
})
export class FileShareComponent implements OnInit {
  @Input() fileShareID: number = 0;
  @Input() interactive: boolean = true;
  fileShareInfo: FileShareInfo | null = null;
  constructor(public http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.http.get<FileShareInfo>(apiEndPoint + '/basic_user_content/get_file_share_info/' + this.fileShareID).subscribe((data) => {
      this.fileShareInfo = data;
    })
  }

  fileIcon(): string {
    let ext = this.fileShareInfo?.file_name!.split('.').pop();
    if (ext === undefined) {
      return 'fas fa-file';
    }
    switch (ext.toLowerCase()) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
      case 'ppt':
      case 'pptx':
        return 'description';
      case 'zip':
      case 'rar':
        return 'folder_zip';
      case 'mp3':
      case 'wav':
        return 'music_note';
      case 'mp4':
      case 'avi':
      case 'wmv':
        return 'videocam';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image';
      default:
        return 'folder';
    }
  }

  openImageFullView() {
    if (!this.interactive) {
      return;
    }
    this.dialog.open(ImageFullViewComponent, {data: this.fileShareLink()});
  }

  fileSize(): string {
    let size = this.fileShareInfo?.file_size!;
    if (size < 1024) {
      return size + 'KB';
    }
    size /= 1024;
    if (size < 1024) {
      return size.toFixed(2) + 'MB';
    }
    size /= 1024;
    return size.toFixed(2) + 'GB';
  }

  fileName(): string {
    // replace the center of the file name with '...' if it is too long
    let name = this.fileShareInfo?.file_name!;
    if (name.length > 20) {
      return name.substr(0, 10) + '...' + name.substr(name.length - 10);
    }
    return name;
  }

  fileShareLink(): string {
    return apiEndPoint + '/basic_user_content/download_file_share/' + this.fileShareID;
  }

  isImage(): boolean {
    let ext = this.fileShareInfo?.file_name!.split('.').pop();
    if (ext === undefined) {
      return false;
    }
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'heic':
      case 'webp':
      case 'tiff':
        return true;
      default:
        return false;
    }
  }

  isVideo(): boolean {
    let ext = this.fileShareInfo?.file_name!.split('.').pop();
    if (ext === undefined) {
      return false;
    }
    switch (ext.toLowerCase()) {
      case 'mp4':
      case 'avi':
      case 'wmv':
      case 'mov':
      case 'mkv':
      case 'flv':
      case 'webm':
        return true;
      default:
        return false;
    }
  }

  downloadFile() {
    if (!this.interactive) {
      return;
    }
    this.http.get(this.fileShareLink(), {responseType: 'blob'}).subscribe(
      (response) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.download = this.fileShareInfo?.file_name!;
        a.href = url;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }
}
