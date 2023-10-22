import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonRegisterComponent } from './pokemon-register/pokemon-register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PokemonService} from "./pokemon.service";
import {HttpClientModule} from "@angular/common/http";
import { PokemonDetalheComponent } from './pokemon-detalhe/pokemon-detalhe.component';


@NgModule({
    declarations: [
        PokemonComponent,
        PokemonRegisterComponent,
        PokemonDetalheComponent
    ],
    exports: [
        PokemonComponent
    ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
