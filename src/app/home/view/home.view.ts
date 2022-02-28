import { Subscription } from "rxjs";
import { View } from "src/app/core/mvp/view";
import { PokemonModel } from '../../shared/models/pokemon.model';

export abstract class HomeView extends View {
    pokemons!: PokemonModel[];
    originalData: PokemonModel[];

    pokemon$?: Subscription;
}