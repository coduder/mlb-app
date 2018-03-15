import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamedaySummaryComponent } from './gameday-summary.component';

describe('GamedaySummaryComponent', () => {
  let component: GamedaySummaryComponent;
  let fixture: ComponentFixture<GamedaySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamedaySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamedaySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
