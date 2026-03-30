import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMidias } from './lista-midias';

describe('ListaMidias', () => {
  let component: ListaMidias;
  let fixture: ComponentFixture<ListaMidias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMidias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMidias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
