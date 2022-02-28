import { Injectable } from "@angular/core";
import { PokemonModel } from '../../shared/models/pokemon.model';

@Injectable()
export class HomeProvider {
    showFormData: boolean = false;
    selectedPokemon?: PokemonModel;

    clearSelectedPokemon() {
        this.selectedPokemon = {idAuthor: 1};
    }
}