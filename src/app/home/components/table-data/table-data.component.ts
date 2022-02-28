import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TableDataPresenter } from './presenter/table-data.presenter';
import { TableDataView } from './view/table-data.view';
import { PokemonModel } from '../../../shared/models/pokemon.model';

@Component({
  selector: 'ds-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent extends TableDataView implements OnInit, OnDestroy {
  @Input() pokemons: PokemonModel[] = [];
  @Output() delete = new EventEmitter<boolean>();

  constructor(private tableDataPresenter: TableDataPresenter) {
    super();
    this.tableDataPresenter.view = this;
  }

  ngOnInit(): void {
    this.tableDataPresenter.init();
  }

  onSelected(pokemon: PokemonModel) {
    this.tableDataPresenter.updatePokemonData(pokemon);
  }

  onDelete(pokemon: PokemonModel) {
    this.tableDataPresenter.deletePokemon(pokemon).subscribe({
      next: () => this.delete.emit(true),
    });
  }

  ngOnDestroy(): void {
    this.showData$?.unsubscribe();
  }

}
