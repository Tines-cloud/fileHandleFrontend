import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.scss'
})
export class PopupMessageComponent {
  constructor(private dialogRef: MatDialogRef<PopupMessageComponent>) {}

  onConfirm(): void {
    // Perform any logic needed before confirming
    this.dialogRef.close(true); // Close the dialog with a confirmation signal
  }

  onCancel(): void {
    // Perform any logic needed before canceling
    this.dialogRef.close(false); // Close the dialog with a cancellation signal
  }
}
