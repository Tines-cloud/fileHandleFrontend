import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileHandleComponent } from './file-handle.component';

describe('FileHandleComponent', () => {
  let component: FileHandleComponent;
  let fixture: ComponentFixture<FileHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileHandleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
