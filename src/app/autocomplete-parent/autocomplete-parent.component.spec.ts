import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteParentComponent } from './autocomplete-parent.component';

describe('AutocompleteParentComponent', () => {
  let component: AutocompleteParentComponent;
  let fixture: ComponentFixture<AutocompleteParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
