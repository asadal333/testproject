import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldTypesComponent } from './world-types.component';

describe('WorldTypesComponent', () => {
  let component: WorldTypesComponent;
  let fixture: ComponentFixture<WorldTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
