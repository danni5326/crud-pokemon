import { HomeProvider } from './home.provider';
import { Observable } from 'rxjs';
describe('HomeProviderTest', () => {
    let homeProvider: HomeProvider;

    beforeEach(() => {
        homeProvider = new HomeProvider();
    });

    it('shouldGetShowFormDatObservable', () => {
        const result$ = homeProvider.getShowFormData();

        expect(result$).not.toBeNull();
    });
    it('shouldChangeShowFormDataValue', () => {
        expect(homeProvider.isShowFormData()).toBeFalsy();

        homeProvider.changeShowFormData(true);

        expect(homeProvider.isShowFormData()).toBeTruthy();
    });
    it('shouldClearPokemonSelected', () => {
        homeProvider.selectedPokemon = {"id": 10};

        homeProvider.clearSelectedPokemon();

        expect(homeProvider.selectedPokemon).toEqual({});
    });
});