import { Component, Input, OnInit } from '@angular/core';
import {FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { parsePhoneNumber, CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js/min';
import { PhoneNumber, PhoneType, PhoneTypes } from 'src/app/model/PhoneNumber';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  @Input() PhoneNumber: PhoneNumber[];
  selectedNumber: PhoneNumber = null;
  types: PhoneType[] = PhoneTypes;
  selectible = true;
  removable = true;
  PhoneNumerFormControl = new FormControl('', [
    (control: AbstractControl) => {
      const phoneNumber = parsePhoneNumberFromString(control.value, 'US');
      if (phoneNumber === undefined || !phoneNumber.isValid()){
        const errors: ValidationErrors = {
          NotANumber: 'Phone Number Not valid'
        };
        return errors;
      }
      return {};
    }
  ]);

  newNumber(): void {
    this.selectedNumber = {
      Number: '',
      Type: 'H'
    };
  }

  selectNumber(phoneNumber: PhoneNumber): void {
    this.selectedNumber = phoneNumber;
  }

  addNumber(): void {
    const phoneNumber = parsePhoneNumberFromString(this.selectedNumber.Number, 'US');
    this.selectedNumber.Number = phoneNumber.formatNational();

    const index = this.PhoneNumber.indexOf(this.selectedNumber);
    if (index < 0){
      this.PhoneNumber.push(this.selectedNumber);
    }
    this.selectedNumber = null;
  }

  removeNumber(phoneNumber: PhoneNumber): void {
    const index = this.PhoneNumber.indexOf(phoneNumber);
    if (index >= 0) {
      this.PhoneNumber.splice(index, 1);
    }
    this.selectedNumber = null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
