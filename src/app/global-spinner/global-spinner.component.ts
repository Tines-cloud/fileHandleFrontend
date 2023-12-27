import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../core/service/spinner-service';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.scss'
})
export class GlobalSpinnerComponent implements OnInit {
  isVisible = this.spinnerService.getSpinnerVisibility();

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }
}