import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterElementComponent } from './filter-element.component';

describe('FilterElementComponent', () => {
  let component: FilterElementComponent;
  let fixture: ComponentFixture<FilterElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
