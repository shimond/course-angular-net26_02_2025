import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDashboardComponent } from './people-dashboard.component';

describe('PeopleDashboardComponent', () => {
  let component: PeopleDashboardComponent;
  let fixture: ComponentFixture<PeopleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
