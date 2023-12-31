import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetalheComponent } from './pokemon-detalhe.component';

describe('PokemonDetalheComponent', () => {
  let component: PokemonDetalheComponent;
  let fixture: ComponentFixture<PokemonDetalheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetalheComponent]
    });
    fixture = TestBed.createComponent(PokemonDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
