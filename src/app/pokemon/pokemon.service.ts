import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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
  constructor(private http: HttpClient) {
  }

  //Pokemon
  cadastrarPokemon(pokemon: PokemonImputModel): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons`;
    return this.http.post<PokemonViewModel>(url, pokemon);
  }

  removerPokemon(id: number): Observable<void> {
    const url = `${environment.apiUrl}/pokemons/${id}`;
    return this.http.get<void>(url);
  }


  atualizarPokemon(id: number, pokemon: AtualizarPokemonImputModel): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons/${id}`;
    return this.http.put<PokemonViewModel>(url, pokemon);
  }

  obterPokemonPorId(id: number): Observable<PokemonViewModel> {
    const url = `${environment.apiUrl}/pokemons/${id}`;
    return this.http.get<PokemonViewModel>(url);
  }

  buscarPokemons(): Observable<PokemonViewModel[]> {
    const url = `${environment.apiUrl}/pokemons`;
    return this.http.get<PokemonViewModel[]>(url);
  }

  buscarPokemonsPorNomeETipo(nome: string, tipo: number): Observable<PokemonViewModel[]> {
    const url = `${environment.apiUrl}/pokemons/buscar`;
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome', nome);
    }
    if (tipo !== null && tipo !== undefined) {
      params = params.set('tipo', tipo.toString());
    }
    return this.http.get<PokemonViewModel[]>(url, {params: params});
  }

  //Pokemons tipo
  buscarTiposPokemon(): Observable<PokemonTipoViewModel[]> {
    const url = `${environment.apiUrl}/pokemontipos`;
    return this.http.get<PokemonTipoViewModel[]>(url);
  }
}

