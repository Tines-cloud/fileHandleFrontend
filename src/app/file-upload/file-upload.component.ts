import { Component } from '@angular/core';
import { FileService } from '../core/service/file.service';
import { ContentType } from '../core/enums/content-type';
import { ServiceType } from '../core/enums/service-type';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  contentType:ContentType=ContentType.IMAGE;
  serviceType:ServiceType=ServiceType.GCP;

  selectedFile: File | null = null;

  constructor(private fileService:FileService){}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile,this.serviceType,this.contentType).subscribe(
        {
            next: (response) => {
              console.log('File uploaded successfully:', response);
              // Optionally, you can notify the user or perform additional actions
            },
            error: (error) => {
              console.error('Error uploading file:', error);
              // Handle the error, e.g., display an error message
            }
        }
      );
    } else {
      console.warn('No file selected for upload');
      // Optionally, you can notify the user that no file is selected
    }
  }
}
