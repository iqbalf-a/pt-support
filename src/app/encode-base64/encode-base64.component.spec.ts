import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodeBase64Component } from './encode-base64.component';

describe('EncodeBase64Component', () => {
  let component: EncodeBase64Component;
  let fixture: ComponentFixture<EncodeBase64Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncodeBase64Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncodeBase64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
