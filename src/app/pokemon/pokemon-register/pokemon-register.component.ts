import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PokemonService} from "../pokemon.service";
import {PokemonImputModel, PokemonTipoViewModel, PokemonViewModel} from "../domain-types/models/pokemon";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from 'sweetalert2'
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pokemon-register',
  standalone: true,
  templateUrl: './pokemon-register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./pokemon-register.component.scss']
})
export class PokemonRegisterComponent implements OnInit{
  formulario!: FormGroup;
  tipos: PokemonTipoViewModel[] = [];
  pokemons: PokemonViewModel[] = [];
  @Output() cadastroSucessoEnviado: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.initTipos();
    this.initForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService,
    public activeModal: NgbActiveModal) {
  }
  onSubmit() {
    if (this.formulario.valid) {
      const pokemon: PokemonImputModel = {
        nome: this.formulario.controls['nome'].value,
        descricao: this.formulario.controls['descricao'].value,
        pokemonTipoId: this.formulario.controls['pokemontipo'].value,
        imagem: this.formulario.controls['imagem'].value
      };
      this.pokemonService.cadastrarPokemon(pokemon).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokemón cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.formulario.reset();
          this.cadastroSucessoEnviado.emit(true);
        },

        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.resolveErros(err)
        }
      });
    } else {
      this.verificarValidacoesDeErro(this.formulario);
    }
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

  verificarValidTouched(campo: string) {
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
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

  private initForm() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      pokemontipo: [null, [Validators.required]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      imagem: []
    })
  }

  private initTipos() {
    this.pokemonService.buscarTiposPokemon().subscribe({
      next: value => {
        this.tipos = value;
      },
      error: err => {
        this.resolveErros(err);
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
}
