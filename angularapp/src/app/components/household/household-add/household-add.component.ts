import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { HouseholdService } from '../../../services/household.service';
import { Household } from '../../../model/Household';

@Component({
  selector: 'app-household-add',
  templateUrl: './household-add.component.html',
  styleUrls: ['./household-add.component.css']
})
export class HouseholdAddComponent implements OnInit {
  household: Household;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private service: HouseholdService) { }

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

  private reset(): void {
    this.household = {
      _id: null,
      LastName: '',
      Address1: '',
      Address2: null,
      City: '',
      State: '',
      Zip: 0,
      Anniversary: null,
      Hobbies: [],
      FavFood: [],
      FavScripture: null,
      FavHymn: null
    };
  }

  public save(): void {
    this.service.addHousehold(this.household).subscribe(_ => this.reset());
  }

  ngOnInit(): void {
    this.reset();
  }

}
