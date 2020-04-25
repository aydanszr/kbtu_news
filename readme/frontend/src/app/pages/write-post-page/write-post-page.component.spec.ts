import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePostPageComponent } from './write-post-page.component';

describe('WritePostPageComponent', () => {
  let component: WritePostPageComponent;
  let fixture: ComponentFixture<WritePostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritePostPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
