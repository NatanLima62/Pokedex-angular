import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonRegisterComponent } from './pokemon-register/pokemon-register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PokemonService} from "./pokemon.service";


@NgModule({
    declarations: [
        PokemonComponent,
        PokemonRegisterComponent
    ],
    exports: [
        PokemonComponent
    ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
