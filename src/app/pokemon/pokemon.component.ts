import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PokemonTipoViewModel, PokemonViewModel} from "./domain-types/models/pokemon";
import {PokemonService} from "./pokemon.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit{
  formulario!: FormGroup;
  tipos!: PokemonTipoViewModel[];
  pokemons!: PokemonViewModel[];

  constructor(
    private service: PokemonService,
    private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.initTipos();
    this.initForm();
    this.buscarPokemons();
  }

  private buscarPokemons(){
    this.service.buscarTodosPokemons().subscribe({
      next: value => {
        console.log(value);
        this.pokemons = value;
        console.log(value);
      },
      error: err => {
        this.resolveErros(err.status, err.errors);
      }
    });
  }
  private initForm(){
    this.formulario = this.formBuilder.group({
      nome: [null],
      pokemontipo: [null],
    })
  }
  private initTipos(){
    this.service.buscarTiposPokemon().subscribe({
      next: value => {
        this.tipos = value;
      },
      error: err => {
        this.resolveErros(err.status, err.errors);
      }
    });
  }

  private resolveErros(status: number, error: string[]){
    switch (status) {
      case 400: {
        Swal.fire({
          icon: 'error',
          title: 'Falha ao cadastrar um pókemon!',
          text: `${error}`,
        })
      }
        break;

      case 404: {
        Swal.fire(
          'Página não encontrada',
          'question'
        )
      }
        break;
    }
  }
}
