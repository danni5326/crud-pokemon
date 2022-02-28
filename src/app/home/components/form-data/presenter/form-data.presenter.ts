import { Injectable } from "@angular/core";
import { View } from 'src/app/core/mvp/view';
import { HomeProvider } from '../../../data-propvider/home.provider';
import { FormDataView } from '../view/form-data.view';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormDataPresenter {
    view!: FormDataView;

    constructor(private homeProvider: HomeProvider, private formBuilder: FormBuilder,) {

    }

    initFormGroup(): FormGroup {
        let pokemon = this.homeProvider.selectedPokemon;
        return this.formBuilder.group({
            name: [pokemon?.name, [Validators.required, Validators.maxLength(50)]],
            image: [pokemon?.image, [Validators.required, Validators.pattern('https?://.+')]],
            attack: [pokemon?.attack ? pokemon.attack : 200, []],
            defense: [pokemon?.defense ? pokemon.defense : 200, []]
        });
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
        this.homeProvider.showFormData = false;
    }
}