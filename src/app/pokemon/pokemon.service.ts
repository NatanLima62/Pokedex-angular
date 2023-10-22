import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  AtualizarPokemonImputModel,
  PokemonImputModel,
  PokemonTipoViewModel,
  PokemonViewModel
} from "./domain-types/models/pokemon";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) { }
  //Pokemon
  cadastrarPokemon(pokemon: PokemonImputModel): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons`;
    return this.http.post<PokemonViewModel>(url, pokemon);
  }

  buscarTodosPokemons(): Observable<PokemonViewModel[]> {
    const url = `${environment.apiUrl}/pokemons`;
    return this.http.get<PokemonViewModel[]>(url);
  }

  removerPokemon(id: number): Observable<void> {
    const url = `${environment.apiUrl}/pokemons/${id}`;
    return this.http.get<void>(url);
  }

  obterPokemonPorId(id: number): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons/${id}`;
    return this.http.get<PokemonViewModel>(url);
  }

  atualizarPokemon(id: number, pokemon: AtualizarPokemonImputModel): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons/${id}`;
    return this.http.put<PokemonViewModel>(url, pokemon);
  }

  obterPokemonPorNome(nome: string): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons/nome/${nome}`;
    return this.http.get<PokemonViewModel>(url);
  }

  buscarTodosPokemonsPorTipo(tipo: number): Observable<PokemonViewModel[]>{
    const url = `${environment.apiUrl}/obter/tipo/${tipo}`;
    return this.http.get<PokemonViewModel[]>(url);
  }

  //Pokemons tipo
  buscarTiposPokemon(): Observable<PokemonTipoViewModel[]> {
    const url = `${environment.apiUrl}/pokemontipos`;
    return this.http.get<PokemonTipoViewModel[]>(url);
  }
}
