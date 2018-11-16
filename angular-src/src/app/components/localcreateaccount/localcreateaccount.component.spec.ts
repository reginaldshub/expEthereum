import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalcreateaccountComponent } from './localcreateaccount.component';

describe('LocalcreateaccountComponent', () => {
  let component: LocalcreateaccountComponent;
  let fixture: ComponentFixture<LocalcreateaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalcreateaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalcreateaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
