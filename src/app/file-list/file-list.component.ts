import { Component } from '@angular/core';
import { FileService } from '../core/service/file.service';
import { FileInfo } from '../core/modal/file-info';
import { ContentType } from '../core/enums/content-type';
import { ServiceType } from '../core/enums/service-type';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent {
  files: FileInfo[] = [];
  contentType:ContentType=ContentType.OTHER;
  serviceType:ServiceType=ServiceType.GCP;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getFiles(this.serviceType);
  }

  getFiles(serviceType:ServiceType){
    this.fileService.getFiles(serviceType).subscribe({
      next: (data) => {
         this.files = data;
       },
      error: (error) => {
         console.error('Error fetching files:', error);
         // Handle the error, e.g., display an error message
       }}
     );
  }

  downloadFile(fileName: string,contentType:ContentType): void {
    this.fileService.downloadFile(fileName,this.serviceType,contentType).subscribe({
     next: (data) => {
        this.downloadFileBlob(data, fileName);
      },
      error:  (error) => {
        console.error('Error downloading file:', error);
        // Handle the error, e.g., display an error message
      }}
    );
  }

  private downloadFileBlob(blob: Blob, fileId: string): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileId; // You can set the desired file name here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  deleteFile(fileName: string,contentType:ContentType): void {
    this.fileService.deleteFile(fileName,this.serviceType,contentType).subscribe(
     {next: () => {
        console.log('File deleted successfully');
        // Optionally, you can update the file list or perform other actions
        this.getFiles(this.serviceType);
      },
     error: (error) => {
        console.error('Error deleting file:', error);
        // Handle the error, e.g., display an error message
      }}
    );
  }
}
