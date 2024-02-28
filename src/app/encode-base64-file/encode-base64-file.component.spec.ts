import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodeBase64FileComponent } from './encode-base64-file.component';

describe('EncodeBase64FileComponent', () => {
  let component: EncodeBase64FileComponent;
  let fixture: ComponentFixture<EncodeBase64FileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncodeBase64FileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncodeBase64FileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
