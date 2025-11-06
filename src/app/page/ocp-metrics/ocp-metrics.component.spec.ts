import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcpMetricsComponent } from './ocp-metrics.component';

describe('OcpMetricsComponent', () => {
  let component: OcpMetricsComponent;
  let fixture: ComponentFixture<OcpMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcpMetricsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcpMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
