import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../pokemon.service";
import {PokemonImputModel} from "../domain-types/models/pokemon";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-pokemon-register',
  templateUrl: './pokemon-register.component.html',
  styleUrls: ['./pokemon-register.component.scss']
})
export class PokemonRegisterComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PokemonService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      tipo: [null, [Validators.required]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  onSubmit() {
    if (this.formulario.valid) {
      const pokemon: PokemonImputModel = {
        nome: this.formulario.controls['nome'].value,
        descricao: this.formulario.controls['descricao'].value,
        pokemontipo: this.formulario.controls['pokemontipo'].value
      };
      this.service.cadastrar(pokemon).subscribe({
        next: value => {
          this.formulario.reset();
        },

        error: (err: HttpErrorResponse) => {
          this.resolveErros(err.status, err.error)
        }
      });
    } else {
      this.verificarValidacoesDeErro(this.formulario);
    }
  }

  verificarValidTouched(campo: string) {
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
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
