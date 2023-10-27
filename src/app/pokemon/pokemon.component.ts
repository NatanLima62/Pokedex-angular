import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PokemonTipoViewModel, PokemonViewModel} from "./domain-types/models/pokemon";
import {PokemonService} from "./pokemon.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import * as _ from 'lodash';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PokemonRegisterComponent} from "./pokemon-register/pokemon-register.component";
import {PokemonDetalheComponent} from "./pokemon-detalhe/pokemon-detalhe.component";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  formularioDeBusca!: FormGroup;
  tipos: PokemonTipoViewModel[] = [];
  pokemons: PokemonViewModel[] = [];
  possuiPokemons: boolean = false;
  valorHeader: string = "Bem vindo treinador!";
  pokemonId: number = 0;
  @ViewChild('cadastroModal') cadastroModal: any;

  constructor(
    private service: PokemonService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initTipos();
    this.initFormBusca();
    this.buscarPokemons();
  }

  onBuscar() {
    const buscar = {
      nome: this.formularioDeBusca.controls['nome'].value,
      pokemontipoid: this.formularioDeBusca.controls['pokemontipo'].value
    }

    this.bucarPokemonsPorNomeETipo(buscar.nome, buscar.pokemontipoid);
  }

  private initFormBusca() {
    this.formularioDeBusca = this.formBuilder.group({
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
        this.possuiPokemons = this.pokemons.length > 0
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

  limparCampos() {
    this.formularioDeBusca.reset();
    this.buscarPokemons()
  }

  corrigirImagem(pokemon: PokemonViewModel) {
    if (!pokemon.imagem) {
      pokemon.imagem = '../../assets/default-image.png';
    }
    return pokemon.imagem;
  }

  formatarTexto(texto: string): string {
    const textoSemAcentos = _.deburr(texto);
    return textoSemAcentos.toLowerCase();
  }

  abrirDetalhesModal(id: number) {
    const modalRef = this.modalService.open(PokemonDetalheComponent);
    modalRef.componentInstance.pokemonId = this.pokemonId = id;
    modalRef.componentInstance.updateSucessoEnviado.subscribe((success: boolean) => {
      if (success) {
        this.buscarPokemons();
      }
    });
    modalRef.componentInstance.removeSucessoEnviado.subscribe((success: boolean) => {
      if (success) {
        this.buscarPokemons();
      }
    });
  }

  open() {
    const modalRef = this.modalService.open(PokemonRegisterComponent);
    modalRef.componentInstance.cadastroSucessoEnviado.subscribe((success: boolean) => {
      if (success) {
        this.buscarPokemons();
      }
    });
  }
}
