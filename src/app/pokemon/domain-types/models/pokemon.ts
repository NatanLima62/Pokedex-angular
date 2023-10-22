//View Model
export type PokemonTipo = {
  id: number
  nome: string
}

export type PokemonViewModel = {
  id: number
  nome: string
  descricao: string
  pokemontipo: PokemonTipo
}

//InputModel
export type PokemonImputModel = {
  nome: string
  descricao: string
  pokemontipo: PokemonTipo
}

export type AtualizarPokemonImputModel = {
  id: number
  nome: string
  descricao: string
  pokemontipoId: number
}
