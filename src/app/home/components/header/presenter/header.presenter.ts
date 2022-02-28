import { Injectable } from '@angular/core';
import { HomeProvider } from '../../../data-provider/home.provider';
import { HeaderView } from '../view/header.view';

@Injectable()
export class HeaderPresenter {
    view!: HeaderView;

    constructor(private homeProvider: HomeProvider) {
    }

    newPokemonEvent() {
        this.homeProvider.clearSelectedPokemon();
        this.homeProvider.changeShowFormData(true);
    }
}