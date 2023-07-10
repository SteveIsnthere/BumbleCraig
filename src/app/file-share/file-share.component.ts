import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndPoint} from "../env";

export interface FileShareInfo {
  file_share_id: number,
  file_name: string,
  file_size: number,
}

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.css']
})
export class FileShareComponent implements OnInit {
  @Input() fileShareID: number = 0;
  fileShareInfo: FileShareInfo | null = null;

  constructor(public http: HttpClient) {

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

  downloadFile() {
    this.http.get(apiEndPoint + '/basic_user_content/download_file_share/' + this.fileShareID, {responseType: 'blob'}).subscribe(
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
