import { HomePresenter } from './home.presenter';
import { Observable } from 'rxjs';
describe('HomePresenterTest', () => {
    let homePresenter: HomePresenter;

    const pokemonService = {
        getPokemons: jest.fn(),
    }

    beforeEach(() => {
        homePresenter = new HomePresenter(pokemonService as any);
        homePresenter.view = {} as any;
    });

    it('shouldGetPokemons', () => {
        const pokemons = [
            {"id": 1, "name": "fake 1"},
            {"id": 10, "name": "fake 10"},
        ];
        pokemonService.getPokemons.mockReturnValue(new Observable(res => {
            res.next(pokemons);
        }));

        homePresenter.getPokemons();

        expect(homePresenter.view.pokemons.length).toBe(2);
        expect(homePresenter.view.pokemons[0].id).toBe(10);
        expect(homePresenter.view.originalData.length).toBe(2);
    });
    it('shouldGetPokemonsError', () => {
        homePresenter.view.pokemons = [];
        pokemonService.getPokemons.mockReturnValue(new Observable(res => {
            res.error("get pokemons error");
        }));

        homePresenter.getPokemons();

        expect(homePresenter.view.pokemons.length).toBe(0);
    });
    it('shouldFilterData', () => {
        homePresenter.view.pokemons = [
            {"id": 1, "name": "butterfree"},
            {"id": 10, "name": "bulbasaur"},
        ];
        homePresenter.view.originalData = homePresenter.view.pokemons;

        homePresenter.filterData("bulba");

        expect(homePresenter.view.pokemons.length).toBe(1);
        expect(homePresenter.view.pokemons[0].id).toBe(10);

        homePresenter.filterData("");

        expect(homePresenter.view.pokemons.length).toBe(2);
        expect(homePresenter.view.pokemons[0].id).toBe(1);
    })
});