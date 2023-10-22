import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../pokemon.service";
import {PokemonImputModel, PokemonTipoViewModel} from "../domain-types/models/pokemon";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-pokemon-register',
  templateUrl: './pokemon-register.component.html',
  styleUrls: ['./pokemon-register.component.scss']
})
export class PokemonRegisterComponent implements OnInit {
  formulario!: FormGroup;
  tipos!: PokemonTipoViewModel[];

  constructor(
    private service: PokemonService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initTipos();
    this.initForm();
  }

  onSubmit() {
    if (this.formulario.valid) {
      const pokemon: PokemonImputModel = {
        nome: this.formulario.controls['nome'].value,
        descricao: this.formulario.controls['descricao'].value,
        pokemontipoid: this.formulario.controls['pokemontipo'].value
      };
      this.service.cadastrarPokemon(pokemon).subscribe({
        next: value => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokemón cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.formulario.reset();
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

  aplicaCssErro(campo: string) {
    return {
      'has-erro': this.verificarValidTouched(campo),
      'has-feedback': this.verificarValidTouched(campo),
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

  private resolveErros(error: HttpErrorResponse){
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
  private initForm(){
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      pokemontipo: [null, [Validators.required]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }
  private initTipos(){
    this.service.buscarTiposPokemon().subscribe({
      next: value => {
        this.tipos = value;
      },
      error: err => {
        this.resolveErros(err);
      }
    });
  }
}
