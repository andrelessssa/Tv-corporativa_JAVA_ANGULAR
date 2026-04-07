import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMidia } from './cadastro-midia';

describe('CadastroMidia', () => {
  let component: CadastroMidia;
  let fixture: ComponentFixture<CadastroMidia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroMidia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroMidia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
