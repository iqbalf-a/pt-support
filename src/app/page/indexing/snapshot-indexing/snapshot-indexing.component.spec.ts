import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotIndexingComponent } from './snapshot-indexing.component';

describe('SnapshotIndexingComponent', () => {
  let component: SnapshotIndexingComponent;
  let fixture: ComponentFixture<SnapshotIndexingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapshotIndexingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnapshotIndexingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
