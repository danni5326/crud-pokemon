import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { View } from 'src/app/core/mvp/view';

export class FormDataView implements View {
    pokemonForm: FormGroup;
    showData: boolean = false;
    showData$: Subscription;
}