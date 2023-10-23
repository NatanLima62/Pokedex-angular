import {Injectable} from '@angular/core';
import {PokemonTipoViewModel} from "../../domain-types/models/pokemon";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {PokemonService} from "../../pokemon.service";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  tipos: PokemonTipoViewModel[] = [];

  constructor(
      protected service: PokemonService) {
  }

  protected initTipos() {
    this.service.buscarTiposPokemon().subscribe({
      next: value => {
        this.tipos = value;
      },
      error: err => {
        this.resolveErros(err);
      }
    });
  }

  protected resolveErros(error: HttpErrorResponse) {
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
}
