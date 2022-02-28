import { TableDataPresenter } from './table-data.presenter';
import { HomeProvider } from '../../../data-provider/home.provider';
import { Observable } from 'rxjs';
describe('TableDataPresenterTest', () => {
    let tableDataPresenter: TableDataPresenter;

    const homeProvider: any | HomeProvider = {
        getShowFormData: jest.fn(),
        clearSelectedPokemon: jest.fn(),
        changeShowFormData: jest.fn(),
    }

    const pokemonService = {
        deletePokemon: jest.fn(),
    }

    beforeEach(() => {
        tableDataPresenter = new TableDataPresenter(homeProvider, pokemonService as any);
        tableDataPresenter.view = { } as any;
    });

    it('shouldInitWithTrue', () => {
        homeProvider.getShowFormData.mockReturnValue(new Observable(res => {
            res.next(true);
        }));
        tableDataPresenter.init();

        expect(tableDataPresenter.view.showData).toBeTruthy();
        expect(tableDataPresenter.view.showData$).not.toBeNull();
    });
    it('shouldUpdatePokemonData', () => {
        homeProvider.selectedPokemon = {};

        tableDataPresenter.updatePokemonData({"id": 10});

        expect(homeProvider.selectedPokemon).toEqual({"id": 10});
        expect(homeProvider.changeShowFormData).toHaveBeenCalledWith(true);
    });
    it('shouldDeletePokemonConfirm', () => {
        jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(true);

        pokemonService.deletePokemon.mockReturnValue(new Observable(res => {
            res.next({});
        }));

        tableDataPresenter.deletePokemon({"id": 1, "name": "fake"});

        expect(pokemonService.deletePokemon).toHaveBeenCalled();
    });
    it('shouldDeletePokemonCancel', () => {
        jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(false);

        tableDataPresenter.deletePokemon({"id": 1, "name": "fake"});

        expect(pokemonService.deletePokemon).not.toHaveBeenCalled();
    });
});