import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonHeaderComponent } from './pokemon-header.component';

describe('PokemonHeaderComponent', () => {
  let component: PokemonHeaderComponent;
  let fixture: ComponentFixture<PokemonHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonHeaderComponent]
    });
    fixture = TestBed.createComponent(PokemonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
