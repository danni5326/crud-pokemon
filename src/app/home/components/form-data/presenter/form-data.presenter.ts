import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PokemonModel } from '../../../../shared/models/pokemon.model';
import { PokemonService } from '../../../../shared/services/pokemon.service';
import { HomeProvider } from '../../../data-propvider/home.provider';
import { FormDataView } from '../view/form-data.view';

@Injectable()
export class FormDataPresenter {
    view!: FormDataView;

    constructor(
        private formBuilder: FormBuilder,
        private homeProvider: HomeProvider,
        private pokemonService: PokemonService
    ) {

    }

    init() {
        this.view.showData$ = this.homeProvider.getShowFormData().subscribe({
            next: (value) => {
                this.view.showData = value;
                if (value) {
                    this.initFormGroup();
                }
            }
        });
    }

    initFormGroup(): void {
        let pokemon = this.homeProvider.selectedPokemon;
        this.view.pokemonForm = this.formBuilder.group({
            id: [pokemon?.id],
            name: [pokemon?.name, [Validators.required, Validators.maxLength(50)]],
            image: [pokemon?.image, [Validators.required, Validators.pattern('https?://.+')]],
            attack: [pokemon?.attack ? pokemon.attack : 50, [Validators.required]],
            defense: [pokemon?.defense ? pokemon.defense : 50, [Validators.required]],
            hp: [pokemon?.hp ? pokemon.hp : 50, [Validators.required]],
            type: [pokemon?.type ? pokemon.type : 'normal', [Validators.required]],
        });
    }

    save(): Observable<PokemonModel> {
        let pokemonToSave: PokemonModel = this.view.pokemonForm.value;

        if (pokemonToSave.id) {
            return this.pokemonService.updatePokemon(pokemonToSave);
        } else {
            return this.pokemonService.savePokemon(pokemonToSave);
        }
    }

    completeSubmit() {
        this.homeProvider.clearSelectedPokemon();
        this.homeProvider.changeShowFormData(false);
    }

    hasErrorControl(name: string, error: string): boolean {
        return this.view.pokemonForm.controls[name].errors?.[error];
    }

    wasTouched(name: string) {
        let control = this.view.pokemonForm.controls[name];
        return control.dirty || control.touched;
    }

    cancel() {
        this.homeProvider.clearSelectedPokemon();
        this.homeProvider.changeShowFormData(false);
    }

    destroy() {
        this.view.showData$?.unsubscribe();
    }
}