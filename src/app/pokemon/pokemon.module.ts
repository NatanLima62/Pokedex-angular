import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonRegisterComponent } from './pokemon-register/pokemon-register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PokemonService} from "./pokemon.service";
import {HttpClientModule} from "@angular/common/http";
import { PokemonDetalheComponent } from './pokemon-detalhe/pokemon-detalhe.component';
import {RouterModule} from "@angular/router";
import { PokemonNavComponent } from './shared/components/pokemon-nav/pokemon-nav.component';
import { PokemonHeaderComponent } from './shared/components/pokemon-header/pokemon-header.component';
import {BaseService} from "./shared/services/base.service";


@NgModule({
    declarations: [
        PokemonComponent,
        PokemonRegisterComponent,
        PokemonDetalheComponent,
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
    NgOptimizedImage
  ],
  providers: [PokemonService, BaseService]
})
export class PokemonModule { }
