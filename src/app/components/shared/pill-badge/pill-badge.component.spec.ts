import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillBadgeComponent } from './pill-badge.component';

describe('PillBadgeComponent', () => {
  let component: PillBadgeComponent;
  let fixture: ComponentFixture<PillBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PillBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
