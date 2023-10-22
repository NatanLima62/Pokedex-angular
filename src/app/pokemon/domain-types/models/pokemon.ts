//View Model
export type PokemonTipoViewModel = {
  id: number
  nome: string
}

export type PokemonViewModel = {
  id: number
  nome: string
  descricao: string
  pokemontipo: PokemonTipoViewModel
}

//InputModel
export type PokemonImputModel = {
  nome: string
  descricao: string
  pokemontipo: PokemonTipoViewModel
}

export type AtualizarPokemonImputModel = {
  id: number
  nome: string
  descricao: string
  pokemontipoId: number
}
