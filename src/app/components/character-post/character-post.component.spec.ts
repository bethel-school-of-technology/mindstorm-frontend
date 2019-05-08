import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPostComponent } from './character-post.component';

describe('CharacterPostComponent', () => {
  let component: CharacterPostComponent;
  let fixture: ComponentFixture<CharacterPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
