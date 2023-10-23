import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  AtualizarPokemonImputModel,
  PokemonTipoViewModel,
  PokemonViewModel
} from "../domain-types/models/pokemon";
import {PokemonService} from "../pokemon.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-pokemon-detalhe',
  templateUrl: './pokemon-detalhe.component.html',
  styleUrls: ['./pokemon-detalhe.component.scss']
})
export class PokemonDetalheComponent implements OnInit {
  formulario!: FormGroup;
  tipos!: PokemonTipoViewModel[];
  pokemon!: PokemonViewModel;
  pokemonId!: number;

  constructor(
    private router: Router,
    private service: PokemonService,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initTipos();
    this.initForm();
  }

  onSubmit() {
    this.activedRoute.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        if (this.formulario.valid) {
          const pokemon: AtualizarPokemonImputModel = {
            id: id,
            nome: this.formulario.controls['nome'].value,
            descricao: this.formulario.controls['descricao'].value,
            pokemonTipoId: this.formulario.controls['pokemontipo'].value,
            imagem: this.formulario.controls['imagem'].value,
          };

          this.service.atualizarPokemon(id, pokemon).subscribe({
            next: value => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Pokemón atualizado com sucesso!',
                showConfirmButton: false,
                timer: 1500
              });
            },
            error: (err: HttpErrorResponse) => {
              console.error(err);
              this.resolveErros(err);
            }
          });
        } else {
          this.verificarValidacoesDeErro(this.formulario);
        }
      }
    });
  }

  getErrors(controlName: string): string[] {
    const control = this.formulario.get(controlName);
    const errors: string[] = [];

    if (control?.errors) {
      for (const errorKey in control.errors) {
        if (errorKey === 'required') {
          errors.push('Campo obrigatório.');
        } else if (errorKey === 'minlength') {
          errors.push(`${controlName} deve ter pelo menos ${control.errors[errorKey].requiredLength} caracteres.`);
        } else if (errorKey === 'maxlength') {
          errors.push(`${controlName} der no máximo ${control.errors[errorKey].requiredLength} caracteres.`);
        }
      }
    }

    return errors;
  }

  aplicaCssErro(campo: string) {
    return {
      'has-erro': this.verificarValidTouched(campo),
      'has-feedback': this.verificarValidTouched(campo),
    }
  }

  verificarValidTouched(campo: string) {
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
  }

  private verificarValidacoesDeErro(formGroup: FormGroup) {
    Object.keys(this.formulario.controls).forEach((campo) => {
      const controle = this.formulario.get(campo);
      if (controle instanceof FormGroup) {
        controle?.markAsDirty();
        this.verificarValidacoesDeErro(controle)
      } else {
        controle?.markAsDirty();
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

  private initForm() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      pokemontipo: [null, [Validators.required]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      imagem: []
    });

    this.activedRoute.params.pipe(
      switchMap(params => {
        const id = params['id'];
        return this.service.obterPokemonPorId(id);
      })
    ).subscribe(
      (pokemon: PokemonViewModel) => {
        this.pokemon = pokemon;
        this.inicializarFormularioComPokemon();
      },
      error => {
        this.resolveErros(error.status);
      }
    );
  }

  private inicializarFormularioComPokemon() {
    if (this.pokemon) {
      this.formulario.setValue({
        nome: this.pokemon.nome,
        pokemontipo: this.pokemon.pokemonTipo.id,
        descricao: this.pokemon.descricao
      });
    } else {
      console.log('Pokemon não encontrado');
    }
  }

  private initTipos() {
    this.service.buscarTiposPokemon().subscribe({
      next: value => {
        this.tipos = value;
      },
      error: err => {
        this.resolveErros(err);
      }
    });
  }

  removerPokemon() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "O pokemón será removido permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.activedRoute.params.subscribe(params => {
          const id = +params['id'];
          if (!isNaN(id)) {
            this.service.removerPokemon(id).subscribe({
              error: (err: HttpErrorResponse) => {
                console.error(err);
                this.resolveErros(err);
              }
            });
          }
        });
        Swal.fire(
          {
            title: 'Removido!',
            text: 'Seu pokémon foi removido.',
            icon: 'success',
            showConfirmButton: true
          }
        ).then(() => {
            this.router.navigate(['/']);
          }
        )
      }
    })
  }
}
