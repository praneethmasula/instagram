import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherprofilesComponent } from './otherprofiles.component';

describe('OtherprofilesComponent', () => {
  let component: OtherprofilesComponent;
  let fixture: ComponentFixture<OtherprofilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherprofilesComponent]
    });
    fixture = TestBed.createComponent(OtherprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
