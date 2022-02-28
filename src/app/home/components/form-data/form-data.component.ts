import { Component, Input, OnInit } from '@angular/core';
import { HomeProvider } from '../../data-propvider/home.provider';
import { FormDataView } from './view/form-data.view';
import { FormDataPresenter } from './presenter/form-data.presenter';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ds-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent extends FormDataView implements OnInit {
  @Input() show: boolean = false;

  constructor(
    public homeProvider: HomeProvider,
    private formDataPresenter: FormDataPresenter,
  ) {
    super();
    this.formDataPresenter.view = this;
  }

  ngOnInit(): void {
    this.pokemonForm = this.formDataPresenter.initFormGroup();
  }

  hasErrorControl(name: string, error: string): boolean {
    return this.formDataPresenter.wasTouched(name) && this.formDataPresenter.hasErrorControl(name, error);
  }

  onSubmit() {
    console.log(this.pokemonForm);

  }

  onCancel() {
    this.formDataPresenter.cancel();
  }

}
