import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvLoop } from './tv-loop';

describe('TvLoop', () => {
  let component: TvLoop;
  let fixture: ComponentFixture<TvLoop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvLoop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvLoop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
