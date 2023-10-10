import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfigComponent } from './dialog-config.component';

describe('DialogConfigComponent', () => {
  let component: DialogConfigComponent;
  let fixture: ComponentFixture<DialogConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfigComponent]
    });
    fixture = TestBed.createComponent(DialogConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
