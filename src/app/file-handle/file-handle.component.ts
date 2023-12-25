import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ServiceType } from '../core/enums/service-type';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FileInfo } from '../core/modal/file-info';

@Component({
  selector: 'app-file-handle',
  templateUrl: './file-handle.component.html',
  styleUrl: './file-handle.component.scss',
  standalone: true,
  imports: [MatCardModule,MatIconModule,NgClass,NgFor,NgIf],
})
export class FileHandleComponent {

  @Input() serviceType:ServiceType | undefined;
  @Output() showFileUpload= new EventEmitter();

  items:FileInfo[]=[];

  goToHome() {
    this.showFileUpload.emit();
    }

    loadFiles(serviceType: string|undefined) {
      if(serviceType===ServiceType.GCP){
     this.serviceType=ServiceType.GCP;}
     else if(serviceType===ServiceType.S3){
      this.serviceType=ServiceType.S3;}
    
      }
      
}
