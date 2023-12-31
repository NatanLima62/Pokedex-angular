import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  AtualizarPokemonImputModel,
  PokemonTipoViewModel,
  PokemonViewModel
} from "../domain-types/models/pokemon";
import {PokemonService} from "../pokemon.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pokemon-detalhe',
  standalone: true,
  templateUrl: './pokemon-detalhe.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./pokemon-detalhe.component.scss']
})
export class PokemonDetalheComponent implements OnInit {
  formulario!: FormGroup;
  tipos!: PokemonTipoViewModel[];
  pokemon!: PokemonViewModel;
  @Input() pokemonId!: number;
  @Output() updateSucessoEnviado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() removeSucessoEnviado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private service: PokemonService,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.initTipos();
    this.initForm();
  }

  onSubmit() {
    if (this.formulario.valid) {
      const pokemon: AtualizarPokemonImputModel = {
        id: this.pokemonId,
        nome: this.formulario.controls['nome'].value,
        descricao: this.formulario.controls['descricao'].value,
        pokemonTipoId: this.formulario.controls['pokemontipo'].value,
        imagem: this.formulario.controls['imagem'].value,
      };

      this.service.atualizarPokemon(this.pokemonId, pokemon).subscribe({
        next: value => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokemón atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });

          this.updateSucessoEnviado.emit(true);
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

    this.service.obterPokemonPorId(this.pokemonId).subscribe({
      next: value => {
        this.pokemon = value;
        this.inicializarFormularioComPokemon();
      },
      error: err => {
        this.resolveErros(err.status);
      }
    });
  }

  private inicializarFormularioComPokemon() {
    if (this.pokemon) {
      this.formulario.setValue({
        nome: this.pokemon.nome,
        pokemontipo: this.pokemon.pokemonTipo.id,
        descricao: this.pokemon.descricao,
        imagem: this.pokemon.imagem
      });
    } else {
      console.log('Pokemon não encontrado');
    }
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

  removerPokemon() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "O pokemón será removido permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.service.removerPokemon(this.pokemonId).subscribe({
            next: () => {
              this.removeSucessoEnviado.emit(true);
              this.activeModal.close();
              Swal.fire(
                {
                  title: 'Removido!',
                  text: 'Seu pokémon foi removido.',
                  icon: 'success',
                  showConfirmButton: true
                }
              )
            },
            error: (err: HttpErrorResponse) => {
              console.error(err);
              this.resolveErros(err);
            }
          });
        }
      })
  }
}
