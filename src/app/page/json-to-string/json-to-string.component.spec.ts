import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonToStringComponent } from './json-to-string.component';

describe('JsonToStringComponent', () => {
  let component: JsonToStringComponent;
  let fixture: ComponentFixture<JsonToStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonToStringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonToStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
