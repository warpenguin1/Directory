import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HouseholdService } from 'src/app/services/household.service';
import { Household } from 'src/app/model/Household';
import { SaveCallback } from 'src/app/model/SaveCallback';


@Component({
  selector: 'app-household-add',
  templateUrl: './household-add.component.html',
  styleUrls: ['./household-add.component.css']
})
export class HouseholdAddComponent implements OnInit {
  household: Household;
  callback: SaveCallback;

  constructor(private router: Router,
              private service: HouseholdService) {
    this.callback = {
      save: () => {
        this.service.addHousehold(this.household)
          .subscribe(h => this.router.navigateByUrl('household/detail/' + h._id));
      },
      name: 'Add'
    };
  }

  private reset(): void {
    this.household = {
      _id: null,
      LastName: '',
      Phone: '',
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
