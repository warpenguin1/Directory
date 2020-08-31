import { Component, OnInit, Input } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Validators, FormGroup, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';

import { HouseholdDetail } from 'src/app/model/Household';
import { SaveCallback } from 'src/app/model/SaveCallback';

@Component({
  selector: 'app-household-edit',
  templateUrl: './household-edit.component.html',
  styleUrls: ['./household-edit.component.css']
})
export class HouseholdEditComponent implements OnInit {
  _HOUSEHOLD: HouseholdDetail;
  @Input()
  get household(): HouseholdDetail {
    return this.getHousehold();
  }
  set household(h: HouseholdDetail){
    this.setHousehold(h);
  }
  @Input() callback: SaveCallback;

  householdFD = this.formBuilder.group({
    LastName: ['', Validators.required],
    Phone: ['', this.checkPhone],
    Address1: ['', Validators.required],
    Address2: [''],
    City: ['', Validators.required],
    State: ['', Validators.required],
    Zip: ['', Validators.required],
    Anniversary: [''],
    FavScripture: [''],
    FavHymn: [''],
  });
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder) { }

  getHousehold(): HouseholdDetail {
    const values = this.householdFD.value;
    const household = this._HOUSEHOLD;
    const phoneNumber = parsePhoneNumberFromString(values.Phone, 'US');
    let phoneString = '';
    if (phoneNumber) {
      phoneString = phoneNumber.formatNational();
    }
    if (household){
      household.LastName = values.LastName;
      household.Phone = phoneString;
      household.Address1 = values.Address1;
      household.Address2 = values.Address2;
      household.City = values.City;
      household.State = values.State;
      household.Zip = values.Zip;
      household.Anniversary = values.Anniversary;
      household.Hobbies = values.Hobbies;
      household.FavFood = values.FavFood;
      household.FavScripture = values.FavScripture;
      household.FavHymn = values.FavHymn;
    }
    return household;
  }

  setHousehold(h: HouseholdDetail): void {
    if (!h) {
      return;
    }
    this._HOUSEHOLD = h;
    this.householdFD.patchValue({
      LastName: h.LastName,
      Phone: h.Phone,
      Address1: h.Address1,
      Address2: h.Address2,
      City: h.City,
      State: h.State,
      Zip: h.Zip,
      Anniversary: h.Anniversary,
      Hobbies: h.Hobbies,
      FavFood: h.FavFood,
      FavScripture: h.FavScripture,
      FavHymn: h.FavHymn
    });
  }

  addHobby(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.household.Hobbies.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeHobby(hobby: string): void {
    const index = this.household.Hobbies.indexOf(hobby);
    if (index >= 0) {
      this.household.Hobbies.splice(index, 1);
    }
  }

  addFood(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.household.FavFood.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeFood(food: string): void {
    const index = this.household.FavFood.indexOf(food);
    if (index >= 0) {
      this.household.FavFood.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.callback.save();
  }

  phoneChange(): void {
    const phoneFC = this.householdFD.get('Phone');
    const phoneNumber = parsePhoneNumberFromString(phoneFC.value, 'US');
    const phoneString = phoneNumber.formatNational();
    if (phoneString !== phoneFC.value) {
      phoneFC.setValue(phoneString);
    }
  }

  setupChanges(): void {
    const phoneFC = this.householdFD.get('Phone');
    phoneFC.valueChanges.subscribe(val => {
      this.phoneChange();
    });
  }

  private checkPhone(control: AbstractControl): ValidationErrors {
    if (control.value) {
      const phoneNumber = parsePhoneNumberFromString(control.value, 'US');
      if (phoneNumber === undefined || !phoneNumber.isValid()){
        const errors: ValidationErrors = {
          NotANumber: 'Phone Number Not valid'
        };
        return errors;
      }
    }
    return {};
  }

  ngOnInit(): void {
    this.setupChanges();
  }
}
