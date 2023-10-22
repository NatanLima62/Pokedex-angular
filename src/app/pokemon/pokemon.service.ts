import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AtualizarPokemonImputModel, PokemonImputModel, PokemonViewModel} from "./domain-types/models/pokemon";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) { }

  cadastrar(pokemon: PokemonImputModel): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons`;
    return this.http.post<PokemonViewModel>(url, pokemon);
  }

  obterPokemons(): Observable<PokemonViewModel[]> {
    const url = `${environment.apiUrl}/pokemons`;
    return this.http.get<PokemonViewModel[]>(url);
  }

  // obterPokemonsPorTipo(tipo: number): Observable<PokemonViewModel[]>{
  //   const url = `${environment.apiUrl}/obter/pokemons/tipo`;
  //   return this.http.get<PokemonViewModel[]>(url);
  // }

  removerPokemon(id: number): Observable<void> {
    const url = `${environment.apiUrl}/pokemons`;
    return this.http.get<void>(url);
  }

  obterPokemonPorId(id: number): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons/${id}`;
    return this.http.get<PokemonViewModel>(url);
  }

  atualizar(id: number, pokemon: AtualizarPokemonImputModel): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons/${id}`;
    return this.http.put<PokemonViewModel>(url, pokemon);
  }
}
