import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUSerForChatComponent } from './search-user-for-chat.component';

describe('SearchUSerForChatComponent', () => {
  let component: SearchUSerForChatComponent;
  let fixture: ComponentFixture<SearchUSerForChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUSerForChatComponent]
    });
    fixture = TestBed.createComponent(SearchUSerForChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
