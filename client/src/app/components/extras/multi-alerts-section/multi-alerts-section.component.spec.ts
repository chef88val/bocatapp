import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAlertsSectionComponent } from './multi-alerts-section.component';

describe('MultiAlertsSectionComponent', () => {
  let component: MultiAlertsSectionComponent;
  let fixture: ComponentFixture<MultiAlertsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiAlertsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAlertsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
