import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JacobComponent } from './jacob.component';

describe('JacobComponent', () => {
  let component: JacobComponent;
  let fixture: ComponentFixture<JacobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JacobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JacobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
