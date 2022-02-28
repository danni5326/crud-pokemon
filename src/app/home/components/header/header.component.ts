import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderView } from './view/header.view';
import { HeaderPresenter } from './presenter/header.presenter';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends HeaderView implements OnInit {
  @Output() search = new EventEmitter<string>();

  constructor(private headerPresenter: HeaderPresenter) { 
    super();
    this.headerPresenter.view = this;
  }

  ngOnInit(): void {
  }

  searchSubmit() {
    this.search.emit(this.searchValue);
  }

  showFormData() {
    this.headerPresenter.newPokemonEvent();
  }

}
