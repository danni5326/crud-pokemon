import { HeaderPresenter } from './header.presenter';
import { HomeProvider } from '../../../data-provider/home.provider';
describe('HeaderPresenterTest', () => {
    let headerPresenter: HeaderPresenter;

    const homeProvider: any | HomeProvider = {
        getShowFormData: jest.fn(),
        clearSelectedPokemon: jest.fn(),
        changeShowFormData: jest.fn(),
    }

    beforeEach(() => {
        headerPresenter = new HeaderPresenter(homeProvider);
        headerPresenter.view = {} as any;
    });

    it('shouldNewPokemonEvent', () => {
        headerPresenter.newPokemonEvent();

        expect(homeProvider.clearSelectedPokemon).toHaveBeenCalled();
        expect(homeProvider.changeShowFormData).toHaveBeenCalledWith(true);
    });
});