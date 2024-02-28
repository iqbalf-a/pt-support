import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeBase64Component } from './decode-base64.component';

describe('DecodeBase64Component', () => {
  let component: DecodeBase64Component;
  let fixture: ComponentFixture<DecodeBase64Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecodeBase64Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecodeBase64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
