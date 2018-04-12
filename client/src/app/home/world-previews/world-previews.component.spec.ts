import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldPreviewsComponent } from './world-previews.component';

describe('WorldPreviewsComponent', () => {
  let component: WorldPreviewsComponent;
  let fixture: ComponentFixture<WorldPreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldPreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldPreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
