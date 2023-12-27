import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    private spinnerVisible = new Subject<boolean>();

    getSpinnerVisibility() {
        return this.spinnerVisible.asObservable();
    }

    show() {
        this.spinnerVisible.next(true);
    }

    hide() {
        this.spinnerVisible.next(false);
    }
}
