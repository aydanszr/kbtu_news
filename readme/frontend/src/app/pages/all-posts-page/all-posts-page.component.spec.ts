import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostsPageComponent } from './all-posts.component';

describe('AllPostsComponent', () => {
  let component: AllPostsPageComponent;
  let fixture: ComponentFixture<AllPostsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPostsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
