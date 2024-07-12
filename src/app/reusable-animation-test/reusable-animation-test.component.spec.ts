import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableAnimationTestComponent } from './reusable-animation-test.component';

describe('ReusableAnimationTestComponent', () => {
  let component: ReusableAnimationTestComponent;
  let fixture: ComponentFixture<ReusableAnimationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableAnimationTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableAnimationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
