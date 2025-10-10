import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionIndexingComponent } from './transaction-indexing.component';

describe('TransactionIndexingComponent', () => {
  let component: TransactionIndexingComponent;
  let fixture: ComponentFixture<TransactionIndexingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionIndexingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionIndexingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
