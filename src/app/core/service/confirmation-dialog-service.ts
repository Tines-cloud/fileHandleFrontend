// confirmation-dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { PopupMessageComponent } from '../../popup-message/popup-message.component';

@Injectable({
  providedIn: 'root',
})

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private confirmationSubject = new Subject<boolean>();

  constructor(private dialog: MatDialog) { }

  openConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmationSubject.next(!!result);
    });

    return this.confirmationSubject.asObservable();
  }
}
