import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowrsComponent } from './followrs.component';

describe('FollowrsComponent', () => {
  let component: FollowrsComponent;
  let fixture: ComponentFixture<FollowrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowrsComponent]
    });
    fixture = TestBed.createComponent(FollowrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
