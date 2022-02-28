import { Injectable } from "@angular/core";
import { HomeView } from '../view/home.view';
import { PokemonService } from '../../shared/services/pokemon.service';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class HomePresenter {
    view!: HomeView;

    constructor(private pokemonService: PokemonService) { }

    getPokemons() {
        this.view.pokemon$ = this.pokemonService.getPokemons().subscribe({
            next: (resp) => this.view.pokemons = resp.sort((a, b) => a.id ? b.id ? b.id - a.id : 1 : -1),
            error: (error) => console.log(error),
        });
    }

    onDestroy(): void {
        this.view.pokemon$?.unsubscribe();
    }
}