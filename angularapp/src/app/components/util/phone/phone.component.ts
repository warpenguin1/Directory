import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, ControlContainer, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';
import { PhoneNumber, PhoneType } from 'src/app/model/PhoneNumber';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  @Input() PhoneNumber: PhoneNumber[];
  selectedNumber = this.formBuilder.group({
    Number: ['', [
      (control: AbstractControl) => {
        const phoneNumber = parsePhoneNumberFromString(control.value, 'US');
        if (phoneNumber === undefined || !phoneNumber.isValid()){
          const errors: ValidationErrors = {
            NotANumber: 'Phone Number Not valid'
          };
          return errors;
        }
        return {};
      }, Validators.required
    ] ],
    Type: ['M']
  });
  selectedIndex: number = null;

  types: PhoneType[] = [
    { Name: 'Moble', Abbreviation: 'M'},
    { Name: 'Office', Abbreviation: 'O'}
  ];
  selectible = true;
  removable = true;

  get Number(): FormControl { return this.selectedNumber.get('Number') as FormControl; }

  newNumber(): void {
    this.selectedNumber.setValue({
      Number: '',
      Type: 'M'
    });
    this.selectedIndex = -1;
  }

  selectNumber(phoneNumber: PhoneNumber): void {
    this.selectedNumber.setValue({
      Number: phoneNumber.Number,
      Type: phoneNumber.Type
    });
    this.selectedIndex = this.PhoneNumber.indexOf(phoneNumber);
  }

  addNumber(): void {
    const phoneNumber = parsePhoneNumberFromString(this.selectedNumber.get('Number').value, 'US');
    const phoneString = phoneNumber.formatNational();

    if (this.selectedIndex < 0){
      const result: PhoneNumber = {
        Number: phoneString,
        Type: this.selectedNumber.get('Type').value
      };
      this.PhoneNumber.push(result);
    } else {
      const selected = this.PhoneNumber[this.selectedIndex];
      selected.Number = phoneString;
      selected.Type = this.selectedNumber.get('Type').value;
    }
    this.selectedIndex = null;
  }
  cancelSelected(): void {
    this.selectedIndex = null;
  }
  removeNumber(phoneNumber: PhoneNumber): void {
    const index = this.PhoneNumber.indexOf(phoneNumber);
    if (index >= 0) {
      this.PhoneNumber.splice(index, 1);
    }
  }

  constructor(private controlContainer: ControlContainer, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
