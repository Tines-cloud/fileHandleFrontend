import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ServiceType } from '../core/enums/service-type';
import { FileHandleComponent } from '../file-handle/file-handle.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  standalone: true,
  imports: [MatCardModule, FileHandleComponent, NgIf],
})
export class LandingPageComponent {

  serviceType: ServiceType | undefined;
  showFileUpload: boolean = false;

  showFileHandle(str: string) {
    this.showFileUpload = true;
    if (str === ServiceType.S3) {
      this.serviceType = ServiceType.S3;
    } else if (str === ServiceType.GCP) {
      this.serviceType = ServiceType.GCP;
    }

  }

  showFileUploadMethod() {
    this.showFileUpload = false;
  }
}
