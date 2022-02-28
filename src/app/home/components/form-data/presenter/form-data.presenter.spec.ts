import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HomeProvider } from '../../../data-provider/home.provider';
import { FormDataPresenter } from './form-data.presenter';

describe('FormDataPresenterTest', () => {
    let formDataPresenter: FormDataPresenter;
    let formBuilder: FormBuilder;

    const homeProvider: any | HomeProvider = {
        getShowFormData: jest.fn(),
        clearSelectedPokemon: jest.fn(),
        changeShowFormData: jest.fn(),
    }

    const pokemonService = {
        updatePokemon: jest.fn(),
        savePokemon: jest.fn(),
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [FormBuilder]
        }).compileComponents();
    }));

    beforeEach(() => {
        formBuilder = TestBed.inject(FormBuilder);
        formDataPresenter = new FormDataPresenter(formBuilder, homeProvider, pokemonService as any);
        formDataPresenter.view = { pokemonForm: FormGroup } as any;
        pokemonService.savePokemon.mockClear();
        pokemonService.updatePokemon.mockClear();
        formDataPresenter.destroy();
        formDataPresenter.view.pokemonForm = formBuilder.group({});
    });

    it('shouldInitWithTrue', () => {
        homeProvider.getShowFormData.mockReturnValue(new Observable(res => {
            res.next(true);
        }));
        formDataPresenter.init();

        expect(formDataPresenter.view.showData).toBeTruthy();
        expect(formDataPresenter.view.showData$).not.toBeNull();
    });
    it('shouldInitFormGroupFromUpdate', () => {
        let pokemon = {
            "id": 1,
            "name": "test",
            "image": "url",
            "attack": 100,
            "defense": 100,
            "hp": 100,
            "type": "fire"
        };

        homeProvider.selectedPokemon = pokemon;
        formDataPresenter.initFormGroup();

        expect(formDataPresenter.view.pokemonForm.value).toEqual(pokemon);
    });
    it('shouldSaveNewPokemon', fakeAsync(() => {
        pokemonService.savePokemon.mockReturnValue(new Observable(res => {
            res.next({});
        }));

        formDataPresenter.save();
        tick(100);

        expect(pokemonService.savePokemon).toHaveBeenCalledWith({});
        expect(pokemonService.updatePokemon).not.toHaveBeenCalled();
    }));
    it('shouldSaveOldPokemon', fakeAsync(() => {
        homeProvider.selectedPokemon = { "id": 10 };
        formDataPresenter.initFormGroup();

        pokemonService.savePokemon.mockReturnValue(new Observable(res => {
            res.next({});
        }));

        formDataPresenter.save();
        tick(100);

        expect(pokemonService.updatePokemon).toHaveBeenCalled();
        expect(pokemonService.savePokemon).not.toHaveBeenCalled();
    }));
    it('shouldCompleteSubmit', () => {
        const changeShowFormData = jest.spyOn(homeProvider, 'changeShowFormData');

        formDataPresenter.completeSubmit();

        expect(changeShowFormData).toHaveBeenCalledWith(false);
        expect(homeProvider.clearSelectedPokemon).toHaveBeenCalled();
    })
    it('shouldReturnHasErrorControl', () => {
        formDataPresenter.initFormGroup();
        const result = formDataPresenter.hasErrorControl('id', 'required');

        expect(result).toBeFalsy();
    });
    it('shouldReturnWasDirty', () => {
        formDataPresenter.initFormGroup();
        formDataPresenter.view.pokemonForm.controls['id'].markAsDirty();

        const result = formDataPresenter.wasTouched('id');

        expect(result).toBeTruthy();
    });
    it('shouldReturnWasTouched', () => {
        formDataPresenter.initFormGroup();
        formDataPresenter.view.pokemonForm.controls['id'].markAsTouched();

        const result = formDataPresenter.wasTouched('id');

        expect(result).toBeTruthy();
    });
});