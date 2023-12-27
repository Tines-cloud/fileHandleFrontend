import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ServiceType } from '../core/enums/service-type';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FileInfo } from '../core/modal/file-info';
import { ContentType } from '../core/enums/content-type';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from '../core/service/confirmation-dialog-service';
import { FilePreviewComponent } from '../file-preview/file-preview.component';
import { FileService } from '../core/service/file.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { SpinnerService } from '../core/service/spinner-service';

@Component({
  selector: 'app-file-handle',
  templateUrl: './file-handle.component.html',
  styleUrl: './file-handle.component.scss',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgClass, NgFor, NgIf, FilePreviewComponent],
})
export class FileHandleComponent implements OnInit {

  @Input() serviceType: any;
  @Output() showFileUpload = new EventEmitter();

  selectedFile: FileInfo | undefined;

  contentType: ContentType = ContentType.IMAGE;

  files: FileInfo[] = [];
  items: FileInfo[] = [];
  constructor(
    private fileService: FileService,
    public dialog: MatDialog,
    private spinnerService: SpinnerService,
    private confirmationDialogService: ConfirmationDialogService) { }
  ngOnInit(): void {
    this.getFiles(this.serviceType);
  }

  goToHome() {
    this.showFileUpload.emit();
  }

  loadFiles(serviceType: string | undefined) {
    this.selectedFile = undefined;
    if (serviceType === ServiceType.GCP) {
      this.serviceType = ServiceType.GCP;
    }
    else if (serviceType === ServiceType.S3) {
      this.serviceType = ServiceType.S3;
    }
    this.getFiles(this.serviceType);
  }

  getFiles(serviceType: ServiceType) {
    this.spinnerService.show();
    this.selectedFile = undefined;
    this.files = [];
    this.items = [];
    this.fileService.getFiles(serviceType).subscribe({
      next: (data) => {
        this.files = data;
        this.filterItems(this.contentType, this.files)
      },
      error: (error) => {
        this.spinnerService.hide();
        console.error('Error fetching files:', error);
        // Handle the error, e.g., display an error message
      }
    }
    );
  }

  filterByContentType(str: string) {
    this.selectedFile = undefined;
    if (ContentType.AUDIO === str) {
      this.contentType = ContentType.AUDIO;
    } else if (ContentType.VIDEO === str) {
      this.contentType = ContentType.VIDEO;
    }
    else if (ContentType.DOC === str) {
      this.contentType = ContentType.DOC;
    }
    else if (ContentType.IMAGE === str) {
      this.contentType = ContentType.IMAGE;
    }

    this.filterItems(this.contentType, this.files)
  }

  filterItems(contentType: ContentType, files: FileInfo[]) {
    this.items = files.filter(file => file.contentType === contentType);
    this.spinnerService.hide();
  }

  onDownload(file: FileInfo) {
    this.confirmationDialogService.openConfirmationDialog().subscribe((confirmed) => {
      if (confirmed) {
        this.spinnerService.show();
        this.fileService.downloadFile(file.fileName, this.serviceType, file.contentType).subscribe({
          next: (data) => {
            this.downloadFileBlob(data, file.fileName);
          },
          error: (error) => {
            this.spinnerService.hide();
            console.error('Error downloading file:', error);
            // Handle the error, e.g., display an error message
          }
        }
        );
      }
    });


  }
  private downloadFileBlob(blob: Blob, fileId: string): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileId; // You can set the desired file name here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    this.spinnerService.hide();
  }

  onDelete(file: FileInfo) {
    this.confirmationDialogService.openConfirmationDialog().subscribe((confirmed) => {
      if (confirmed) {
        this.spinnerService.show();
        this.fileService.deleteFile(file.fileName, this.serviceType, file.contentType).subscribe(
          {
            next: () => {
              this.getFiles(this.serviceType);
            },
            error: (error) => {
              console.error('Error deleting file:', error);
            }
          }
        );
      }
    });
  }

  selectItem(file: FileInfo) {
    this.spinnerService.show();
    this.selectedFile = file;
    this.spinnerService.hide();
  }

  uploadFile() {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '400px',
      data: {
        contentType: this.contentType,
        serviceType: this.serviceType,
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getFiles(this.serviceType);
      }
    });
  }
}
