import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestnetworkComponent } from './testnetwork.component';

describe('TestnetworkComponent', () => {
  let component: TestnetworkComponent;
  let fixture: ComponentFixture<TestnetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestnetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestnetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
