import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringFilterComponent } from './monitoring-filter.component';

describe('MonitoringFilterComponent', () => {
  let component: MonitoringFilterComponent;
  let fixture: ComponentFixture<MonitoringFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitoringFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
