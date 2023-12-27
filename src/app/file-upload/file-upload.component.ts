import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { FileService } from '../core/service/file.service';
import { ContentType } from '../core/enums/content-type';
import { ServiceType } from '../core/enums/service-type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  @Output() closeModal = new EventEmitter<void>();
  uploadedFile: File | null = null;
  previewImage: any;
  previewVideo: any;
  previewAudio: any;

  contentType: any;
  serviceType: any;

  imageFileExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  videoFileExtensions: string[] = ['mp4', 'avi', 'mkv', 'mov'];
  audioFileExtensions: string[] = ['mp3', 'wav', 'ogg'];
  documentFileExtensions: string[] = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];


  // Inject data from the dialog
  constructor(
    public dialogRef: MatDialogRef<FileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contentType: string; serviceType: string },
    private fileService: FileService
  ) {
    this.serviceType = data.serviceType;
    this.contentType = data.contentType;
  }

  onFileSelected(event: any) {
    // Handle file selection logic (e.g., show preview)
    const file = event.target.files[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        // Image file
        this.previewImage = URL.createObjectURL(file);
        this.previewVideo = undefined; // Reset video preview
        this.previewAudio = undefined; // Reset audio preview
      } else if (file.type.startsWith('video/')) {
        // Video file
        this.previewVideo = URL.createObjectURL(file);
        this.previewImage = undefined; // Reset image preview
        this.previewAudio = undefined; // Reset audio preview
      } else if (file.type.startsWith('audio/')) {
        // Audio file
        this.previewAudio = URL.createObjectURL(file);
        this.previewImage = undefined; // Reset image preview
        this.previewVideo = undefined; // Reset video preview
      } else {
        // Unsupported file type
        this.previewImage = undefined;
        this.previewVideo = undefined;
        this.previewAudio = undefined;
        console.error('Unsupported file type.');
      }
    }
    this.uploadedFile = file;
  }


  removeFile() {
    this.fileInput.nativeElement.value = '';
    this.uploadedFile = null;
    this.previewImage = undefined;
    this.previewVideo = undefined;
    this.previewAudio = undefined;
  }

  closeUploadModal() {
    // Close the modal
    this.dialogRef.close();
  }
  uploadFile(): void {
    if (this.uploadedFile) {
      this.fileService.uploadFile(this.uploadedFile, this.serviceType, this.contentType).subscribe(
        {
          next: (response) => {
            console.log('File uploaded successfully:', response);
            this.dialogRef.close(true);
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

  generateAcceptAttribute(): string {
    if (this.contentType === ContentType.IMAGE) {
      return this.imageFileExtensions.map(ext => `.${ext}`).join(',');
    } else if (this.contentType === ContentType.AUDIO) {
      return this.audioFileExtensions.map(ext => `.${ext}`).join(',');
    } else if (this.contentType === ContentType.VIDEO) {
      return this.videoFileExtensions.map(ext => `.${ext}`).join(',');
    } else if (this.contentType === ContentType.DOC) {
      return this.documentFileExtensions.map(ext => `.${ext}`).join(',');
    }
    return '';
  }
}
