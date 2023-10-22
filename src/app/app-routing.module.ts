import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonRegisterComponent} from "./pokemon/pokemon-register/pokemon-register.component";
import {PokemonComponent} from "./pokemon/pokemon.component";

const routes: Routes = [
  {path: '', component: PokemonComponent},
  {path: 'cadastrar', component: PokemonRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
