import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamedayDetailComponent } from './gameday-detail.component';

describe('GamedayDetailComponent', () => {
  let component: GamedayDetailComponent;
  let fixture: ComponentFixture<GamedayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamedayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamedayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
