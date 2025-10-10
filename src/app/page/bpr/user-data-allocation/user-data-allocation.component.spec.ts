import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataAllocationComponent } from './user-data-allocation.component';

describe('UserDataAllocationComponent', () => {
  let component: UserDataAllocationComponent;
  let fixture: ComponentFixture<UserDataAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDataAllocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
