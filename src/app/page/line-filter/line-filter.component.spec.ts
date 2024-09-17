import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineFilterComponent } from './line-filter.component';

describe('LineFilterComponent', () => {
  let component: LineFilterComponent;
  let fixture: ComponentFixture<LineFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
