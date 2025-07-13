import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataValidator } from './user-data-validator';

describe('UserDataValidator', () => {
  let component: UserDataValidator;
  let fixture: ComponentFixture<UserDataValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDataValidator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataValidator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
