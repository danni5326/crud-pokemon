import { Component, Input, OnInit } from '@angular/core';
import { PokemonModel } from '../../../shared/models/pokemon.model';
import { HomeProvider } from '../../data-propvider/home.provider';

@Component({
  selector: 'ds-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {
  @Input() pokemons: PokemonModel[] = [];

  constructor(public homeProvider: HomeProvider) { }

  ngOnInit(): void {
  }

}
