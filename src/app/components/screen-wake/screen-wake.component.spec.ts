import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenWakeComponent } from './screen-wake.component';

describe('ScreenWakeComponent', () => {
  let component: ScreenWakeComponent;
  let fixture: ComponentFixture<ScreenWakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenWakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreenWakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
