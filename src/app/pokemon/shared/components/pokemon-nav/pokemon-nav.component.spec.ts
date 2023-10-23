import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonNavComponent } from './pokemon-nav.component';

describe('PokemonNavComponent', () => {
  let component: PokemonNavComponent;
  let fixture: ComponentFixture<PokemonNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonNavComponent]
    });
    fixture = TestBed.createComponent(PokemonNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
