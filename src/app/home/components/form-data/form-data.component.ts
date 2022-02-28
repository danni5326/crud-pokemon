import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormDataPresenter } from './presenter/form-data.presenter';
import { FormDataView } from './view/form-data.view';

@Component({
  selector: 'ds-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent extends FormDataView implements OnInit, OnDestroy {
  @Output() submit = new EventEmitter<boolean>();

  constructor(
    private formDataPresenter: FormDataPresenter,
  ) {
    super();
    this.formDataPresenter.view = this;
  }

  ngOnInit(): void {
    this.formDataPresenter.init();
  }

  hasErrorControl(name: string, error: string): boolean {
    return this.formDataPresenter.wasTouched(name) && this.formDataPresenter.hasErrorControl(name, error);
  }

  onSubmit() {
    this.formDataPresenter.save().subscribe({
      next: () => {
        this.formDataPresenter.completeSubmit();
        this.submit.emit(true);
      }
    });
  }

  onCancel() {
    this.formDataPresenter.cancel();
  }

  ngOnDestroy(): void {
    this.formDataPresenter.destroy();
  }

}
