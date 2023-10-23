import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokemonComponent} from "./pokemon.component";
import {PokemonRegisterComponent} from "./pokemon-register/pokemon-register.component";
import {PokemonDetalheComponent} from "./pokemon-detalhe/pokemon-detalhe.component";

const routes: Routes = [
  {path: '', component: PokemonComponent },
  {path: 'cadastrar', component: PokemonRegisterComponent},
  {path: ':id', component: PokemonDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule {
}
