import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'pokemons', pathMatch: "full"},
  {path: 'pokemons', loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
