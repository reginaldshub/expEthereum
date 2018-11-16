import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaltransactionsComponent } from './localtransactions.component';

describe('LocaltransactionsComponent', () => {
  let component: LocaltransactionsComponent;
  let fixture: ComponentFixture<LocaltransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaltransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaltransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
