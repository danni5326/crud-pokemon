import { Injectable } from '@angular/core';
import { HomeProvider } from '../../../data-propvider/home.provider';
import { HeaderView } from '../view/header.view';

@Injectable()
export class HeaderPresenter {
    view!: HeaderView;

    constructor(private homeProvider: HomeProvider) {
    }

    newPokemonEvent() {
        this.homeProvider.showFormData = true;
    }
}