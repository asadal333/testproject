import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldPreviewComponent } from './world-preview.component';

describe('WorldPreviewComponent', () => {
  let component: WorldPreviewComponent;
  let fixture: ComponentFixture<WorldPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
