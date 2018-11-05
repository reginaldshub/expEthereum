import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalnetworkComponent } from './localnetwork.component';

describe('LocalnetworkComponent', () => {
  let component: LocalnetworkComponent;
  let fixture: ComponentFixture<LocalnetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalnetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalnetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
