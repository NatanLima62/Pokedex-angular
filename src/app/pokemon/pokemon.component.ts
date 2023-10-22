import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PokemonTipoViewModel, PokemonViewModel} from "./domain-types/models/pokemon";
import {PokemonService} from "./pokemon.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  tipos!: PokemonTipoViewModel[];
  pokemons!: PokemonViewModel[];
  possuiPokemons: boolean = false;

  constructor(
    private router: Router,
    private service: PokemonService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initTipos();
    this.initForm();
    this.buscarPokemons();
    this.possuiPokemons = this.pokemons.length > 0
  }

  onBuscar() {
    const buscar = {
      nome: this.formulario.controls['nome'].value,
      pokemontipoid: this.formulario.controls['pokemontipo'].value
    }

    this.bucarPokemonsPorNomeETipo(buscar.nome, buscar.pokemontipoid);
  }

  private initForm() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      pokemontipo: [null],
    })
  }

  private initTipos() {
    this.service.buscarTiposPokemon().subscribe({
      next: value => {
        this.tipos = value;
      },
      error: err => {
        this.resolveErros(err.status);
      }
    });
  }

  private buscarPokemons() {
    this.service.buscarPokemons().subscribe({
      next: value => {
        this.pokemons = value;
        this.possuiPokemons = this.pokemons.length >= 1;
        console.log(this.possuiPokemons);
      },
      error: err => {
        this.resolveErros(err.status);
      }
    });
  }

  private bucarPokemonsPorNomeETipo(nome: string, tipo: number) {
    this.service.buscarPokemonsPorNomeETipo(nome, tipo).subscribe({
      next: value => {
        return this.pokemons = value;
      },
      error: err => {
        this.resolveErros(err.status);
      }
    });
  }

  private resolveErros(error: HttpErrorResponse) {
    switch (error.status) {
      case 400: {
        Swal.fire({
          icon: 'error',
          title: `${error.error.title}`,
          text: `${error.error.erros}`,
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

  ngOnDestroy(): void {
  }

  abrirCard(id: number) {
    this.router.navigate([`pokemon/${id}`]);
  }

  limparCampos() {

  }
}
