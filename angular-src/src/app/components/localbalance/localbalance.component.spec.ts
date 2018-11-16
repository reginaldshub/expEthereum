import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalbalanceComponent } from './localbalance.component';

describe('LocalbalanceComponent', () => {
  let component: LocalbalanceComponent;
  let fixture: ComponentFixture<LocalbalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalbalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
