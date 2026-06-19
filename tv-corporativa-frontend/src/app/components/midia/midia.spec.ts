import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Midia } from './midia';

describe('Midia', () => {
  let component: Midia;
  let fixture: ComponentFixture<Midia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Midia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Midia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
