//View Model
export type PokemonTipoViewModel = {
  id: number
  nome: string
}

export type PokemonViewModel = {
  id: number
  nome: string
  descricao: string
  pokemonTipo: PokemonTipoViewModel
}

//InputModel
export type PokemonImputModel = {
  nome: string
  descricao: string
  pokemonTipoId: number
}

export type AtualizarPokemonImputModel = {
  id: number
  nome: string
  descricao: string
  pokemonTipoId: number
}
