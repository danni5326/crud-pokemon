import { fakeAsync, flush } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';
describe('PokemonServiceTest', () => {
    let pokemonService: PokemonService;

    const httpClient = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(() => {
        pokemonService = new PokemonService(httpClient as any);
    });

    it('shouldGetPokemons', fakeAsync(() => {
        const pokemons = [
            { "id": 1, "name": "butterfree" },
            { "id": 10, "name": "bulbasaur" },
        ];

        httpClient.get.mockReturnValue(new Observable(res => {
            res.next(pokemons);
            res.complete();
        }));

        pokemonService.getPokemons().subscribe({
            next: (value) => {
                expect(value.length).toBe(2);
                expect(value[0].id).toBe(1);
            }
        });
        flush();
    }));
    it('shouldSavePokemon', fakeAsync(() => {
        const pokemon = { "id": 100 };

        httpClient.post.mockReturnValue(new Observable(res => {
            res.next(pokemon);
            res.complete();
        }));

        pokemonService.savePokemon(pokemon).subscribe({
            next: (value) => {
                expect(value).not.toBeNull();
                expect(value.idAuthor).not.toBeNull();
            }
        });
        flush();
    }));
    it('shouldUpdatePokemon', fakeAsync(() => {
        const pokemon = { "id": 100 };

        httpClient.put.mockReturnValue(new Observable(res => {
            res.next(pokemon);
            res.complete();
        }));

        pokemonService.updatePokemon(pokemon).subscribe({
            next: (value) => {
                expect(value).not.toBeNull();
                expect(value.idAuthor).not.toBeNull();
            }
        });
        flush();
    }));
    it('shouldDeletePokemon', fakeAsync(() => {
        httpClient.delete.mockReturnValue(new Observable(res => {
            res.next({});
            res.complete();
        }));

        pokemonService.deletePokemon(100);
        flush();

        expect(httpClient.delete).toHaveBeenCalled();
    }));
});