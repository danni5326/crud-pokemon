import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonModel } from '../../shared/models/pokemon.model';

@Injectable()
export class HomeProvider {
    private showFormData = new BehaviorSubject<boolean>(false);
    selectedPokemon?: PokemonModel;

    getShowFormData(): Observable<boolean> {
        return this.showFormData.asObservable();
    }

    changeShowFormData(value: boolean): void {
        this.showFormData.next(value);
    }

    isShowFormData(): boolean {
        return this.showFormData.value;
    }

    clearSelectedPokemon() {
        this.selectedPokemon = {};
    }
}