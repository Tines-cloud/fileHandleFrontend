import { Component, Input } from '@angular/core';
import { FileInfo } from '../core/modal/file-info';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-file-preview',
  standalone: true,
  templateUrl: './file-preview.component.html',
  styleUrl: './file-preview.component.scss',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf]
})
export class FilePreviewComponent {
  @Input() selectedFile: any;
  contentType = '';
  constructo() {
    this.contentType = this.selectedFile.contentType
    console.log(this.selectedFile.contentType)
  }
}
