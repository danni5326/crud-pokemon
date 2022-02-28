import { Injectable } from '@angular/core';
import { PokemonModel } from '../../../../shared/models/pokemon.model';
import { HomeProvider } from '../../../data-provider/home.provider';
import { TableDataView } from '../view/table-data.view';
import { EMPTY, Observable } from 'rxjs';
import { PokemonService } from '../../../../shared/services/pokemon.service';

@Injectable()
export class TableDataPresenter {
    view: TableDataView;

    constructor(private homeProvider: HomeProvider, private pokemonService: PokemonService) { }

    init() {
        this.view.showData$ = this.homeProvider.getShowFormData().subscribe({ next: (value) => this.view.showData = value });
    }

    updatePokemonData(pokemon: PokemonModel): void {
        this.homeProvider.selectedPokemon = pokemon;
        this.homeProvider.changeShowFormData(true);
    }

    deletePokemon(pokemon: PokemonModel): Observable<PokemonModel> {
        if (confirm(`¿Está seguro de eliminar el pokémon ${pokemon.name}? `)) {
            return this.pokemonService.deletePokemon(pokemon?.id ? pokemon.id : 0);
        }

        return EMPTY;
    }
}