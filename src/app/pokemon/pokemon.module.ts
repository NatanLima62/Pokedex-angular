import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import {PokemonService} from "./pokemon.service";
import { PokemonNavComponent } from './shared/components/pokemon-nav/pokemon-nav.component';
import { PokemonHeaderComponent } from './shared/components/pokemon-header/pokemon-header.component';


@NgModule({
    declarations: [
        PokemonComponent,
        PokemonNavComponent,
        PokemonHeaderComponent,
    ],
  exports: [
    PokemonComponent,
    PokemonNavComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgOptimizedImage,
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
