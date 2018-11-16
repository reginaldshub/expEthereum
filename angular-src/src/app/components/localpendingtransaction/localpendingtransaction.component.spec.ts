import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalpendingtransactionComponent } from './localpendingtransaction.component';

describe('LocalpendingtransactionComponent', () => {
  let component: LocalpendingtransactionComponent;
  let fixture: ComponentFixture<LocalpendingtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalpendingtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalpendingtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
