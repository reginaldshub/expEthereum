import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalsendtransactionComponent } from './localsendtransaction.component';

describe('LocalsendtransactionComponent', () => {
  let component: LocalsendtransactionComponent;
  let fixture: ComponentFixture<LocalsendtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalsendtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalsendtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
