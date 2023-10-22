import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonRegisterComponent} from "./pokemon/pokemon-register/pokemon-register.component";
import {PokemonComponent} from "./pokemon/pokemon.component";
import {PokemonDetalheComponent} from "./pokemon/pokemon-detalhe/pokemon-detalhe.component";

const routes: Routes = [
  {path: '', redirectTo: 'pokemon', pathMatch: "full"},
  {path: 'pokemon', component: PokemonComponent},
  {path: 'pokemon/cadastrar', component: PokemonRegisterComponent},
  {path: 'pokemon/:id', component: PokemonDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
