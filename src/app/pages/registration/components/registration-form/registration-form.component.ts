import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CustomValidators } from 'ng2-validation';

import { Customer } from 'ish-core/models/customer/customer.model';
import { HttpError } from 'ish-core/models/http-error/http-error.model';
import { Locale } from 'ish-core/models/locale/locale.model';
import { AddressFormFactoryProvider } from '../../../../shared/address-forms/configurations/address-form-factory.provider';
import { markAsDirtyRecursive, markFormControlsAsInvalid } from '../../../../shared/forms/utils/form-utils';
import { SpecialValidators } from '../../../../shared/forms/validators/special-validators';

@Component({
  selector: 'ish-registration-form',
  templateUrl: './registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit, OnChanges {
  @Input() languages: Locale[];
  @Input() error: HttpError;

  @Output() create = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private afs: AddressFormFactoryProvider) {}

  ngOnInit() {
    this.form = this.fb.group({
      credentials: this.fb.group({
        login: ['', [Validators.required, CustomValidators.email]],
        loginConfirmation: ['', [Validators.required, CustomValidators.email]],
        password: ['', [Validators.required, SpecialValidators.password]],
        passwordConfirmation: ['', [Validators.required, SpecialValidators.password]],
        securityQuestion: ['', [Validators.required]],
        securityQuestionAnswer: ['', [Validators.required]],
      }),
      countryCodeSwitch: ['', [Validators.required]],
      preferredLanguage: ['en_US', [Validators.required]],
      birthday: [''],
      captcha: [false, [Validators.required]],
      address: this.afs.getFactory('default').getGroup({}), // filled dynamically when country code changes
    });

    // set validators for credentials form
    const credForm = this.form.get('credentials');
    credForm.get('loginConfirmation').setValidators(CustomValidators.equalTo(credForm.get('login')));
    credForm.get('passwordConfirmation').setValidators(CustomValidators.equalTo(credForm.get('password')));
  }

  ngOnChanges(c: SimpleChanges) {
    this.applyError(c.error);
  }

  private applyError(error: SimpleChange) {
    if (error && error.currentValue && error.currentValue.headers['error-missing-attributes']) {
      const missingAttributes = error.currentValue.headers['error-missing-attributes'];
      // map missing 'email' response to login field
      const list = missingAttributes.split(',').map(attr => (attr === 'email' ? 'credentials.login' : attr));
      markFormControlsAsInvalid(this.form, list);
    }
  }

  cancelForm() {
    this.cancel.emit();
  }

  /**
   * Submits form and throws create event when form is valid
   */
  submitForm() {
    if (this.form.invalid) {
      this.submitted = true;
      markAsDirtyRecursive(this.form);
      return;
    }

    const formCustomer = this.form.value;

    const customer: Customer = {
      firstName: formCustomer.address.firstName,
      lastName: formCustomer.address.lastName,
      customerNo: UUID.UUID(), // TODO: customerNo should be generated by the server
      email: formCustomer.credentials.login,
      phoneHome: formCustomer.address.phoneHome,
      title: formCustomer.address.title,
      address: formCustomer.address,
      credentials: {
        login: formCustomer.credentials.login,
        password: formCustomer.credentials.password,
        securityQuestion: formCustomer.credentials.securityQuestion,
        securityQuestionAnswer: formCustomer.credentials.securityQuestionAnswer,
      },
      birthday: formCustomer.birthday === '' ? undefined : formCustomer.birthday, // TODO: see IS-22276
      preferredLanguage: formCustomer.preferredLanguage,
    };

    this.create.emit(customer);
  }

  get formDisabled() {
    return this.form.invalid && this.submitted;
  }
}