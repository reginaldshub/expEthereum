import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocallistaccountComponent } from './locallistaccount.component';

describe('LocallistaccountComponent', () => {
  let component: LocallistaccountComponent;
  let fixture: ComponentFixture<LocallistaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocallistaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocallistaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
