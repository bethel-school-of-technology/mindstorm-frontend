import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharcterPostComponent } from './charcter-post.component';

describe('CharcterPostComponent', () => {
  let component: CharcterPostComponent;
  let fixture: ComponentFixture<CharcterPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharcterPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharcterPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
