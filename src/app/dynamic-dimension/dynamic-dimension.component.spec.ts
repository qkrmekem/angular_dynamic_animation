import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDimensionComponent } from './dynamic-dimension.component';

describe('DynamicDimensionComponent', () => {
  let component: DynamicDimensionComponent;
  let fixture: ComponentFixture<DynamicDimensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDimensionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
