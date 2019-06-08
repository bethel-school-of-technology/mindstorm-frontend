import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MartyComponent } from './marty.component';

describe('MartyComponent', () => {
  let component: MartyComponent;
  let fixture: ComponentFixture<MartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
