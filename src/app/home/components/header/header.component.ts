import { Component, OnInit } from '@angular/core';
import { HeaderView } from './view/header.view';
import { HeaderPresenter } from './presenter/header.presenter';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends HeaderView implements OnInit {

  constructor(private headerPresenter: HeaderPresenter) { 
    super();
    this.headerPresenter.view = this;
  }

  ngOnInit(): void {
  }

  showFormData() {
    this.headerPresenter.newPokemonEvent();
  }

}
