import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesJobsListComponent } from './favorites-jobs-list.component';

describe('FavoritesJobsListComponent', () => {
  let component: FavoritesJobsListComponent;
  let fixture: ComponentFixture<FavoritesJobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesJobsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritesJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
