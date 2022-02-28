import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PokemonModel } from '../models/pokemon.model';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    constructor(private http: HttpClient) { }

    getPokemons(): Observable<Array<PokemonModel>> {
        const url = `${environment.apiUrl}/pokemons/?idAuthor=${environment.idAuthor}`;
        return this.http.get<Array<PokemonModel>>(url);
    }

    savePokemon(pokemon: PokemonModel): Observable<PokemonModel> {
        pokemon.idAuthor = environment.idAuthor;
        const url = `${environment.apiUrl}/pokemons/?idAuthor=${environment.idAuthor}`;

        return this.http.post<PokemonModel>(url, pokemon);
    }

    updatePokemon(pokemon: PokemonModel): Observable<PokemonModel> {
        pokemon.idAuthor = environment.idAuthor;
        const url = `${environment.apiUrl}/pokemons/${pokemon.id}`;

        return this.http.put<PokemonModel>(url, pokemon);
    }

    deletePokemon(id: number): Observable<PokemonModel> {
        const url = `${environment.apiUrl}/pokemons/${id}`;

        return this.http.delete(url);
    }
}