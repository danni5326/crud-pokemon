import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { FormDataComponent } from './components/form-data/form-data.component';
import { HomeProvider } from './data-propvider/home.provider';
import { HomePresenter } from './presenter/home.presenter';
import { HeaderPresenter } from './components/header/presenter/header.presenter';
import { FormDataPresenter } from './components/form-data/presenter/form-data.presenter';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    TableDataComponent,
    FormDataComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    HomeProvider,
    HomePresenter,
    HeaderPresenter,
    FormDataPresenter,
  ]
})
export class HomeModule { }
