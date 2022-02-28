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
        const url = environment.apiUrl + '/pokemons/?idAuthor=1';
        return this.http.get<Array<PokemonModel>>(url);
    }
}