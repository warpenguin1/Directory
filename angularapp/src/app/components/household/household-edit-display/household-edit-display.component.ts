import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectID } from 'bson';
import { switchMap } from 'rxjs/operators';

import { HouseholdDetail } from 'src/app/model/Household';
import { HouseholdService } from 'src/app/services/household.service';
import { SaveCallback } from 'src/app/model/SaveCallback';

@Component({
  selector: 'app-household-edit-display',
  templateUrl: './household-edit-display.component.html',
  styleUrls: ['./household-edit-display.component.css']
})
export class HouseholdEditDisplayComponent implements OnInit {
  household: HouseholdDetail;
  callback: SaveCallback;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: HouseholdService) {
    this.callback = {
      save: () => {
        this.service.updateHousehold(this.household)
          .subscribe(h => this.router.navigateByUrl('household/detail/' + this.household._id));
      },
      name: 'Update'
    };
  }

  load(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const selectedId = new ObjectID(params.get('id'));
        return this.service.getHousehold(selectedId);
      })
    ).subscribe(h => {
      this.household = h;
    });
  }

  ngOnInit(): void {
    this.load();
  }
}
