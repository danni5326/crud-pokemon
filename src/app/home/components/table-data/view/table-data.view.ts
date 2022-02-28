import { Subscription } from 'rxjs';
import { View } from 'src/app/core/mvp/view';

export class TableDataView implements View {
    showData: boolean = false;
    showData$: Subscription;
}