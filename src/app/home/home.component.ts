import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeView } from './view/home.view';
import { HomePresenter } from './presenter/home.presenter';

@Component({
  selector: 'ds-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HomeView implements OnInit, OnDestroy {

  constructor(private homePresenter: HomePresenter) { 
    super();
    this.homePresenter.view = this;
  }

  ngOnInit(): void {
    this.homePresenter.getPokemons();
  }

  updateData() {
    this.homePresenter.getPokemons();
  }

  filterData(value: string) {
    this.homePresenter.filterData(value);
  }

  ngOnDestroy(): void {
      this.pokemon$?.unsubscribe();
  }

}
