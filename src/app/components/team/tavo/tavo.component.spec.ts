import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TavoComponent } from './tavo.component';

describe('TavoComponent', () => {
  let component: TavoComponent;
  let fixture: ComponentFixture<TavoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TavoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TavoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
