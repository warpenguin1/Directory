import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectID } from 'bson';
import { switchMap } from 'rxjs/operators';

import { HouseholdDetail } from 'src/app/model/Household';
import { HouseholdService } from '../../../services/household.service';

@Component({
  selector: 'app-household-detail-display',
  templateUrl: './household-detail-display.component.html',
  styleUrls: ['./household-detail-display.component.css']
})
export class HouseholdDetailDisplayComponent implements OnInit {
  household: HouseholdDetail;

  constructor(private route: ActivatedRoute,
              private service: HouseholdService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const selectedId = new ObjectID(params.get('id'));
        return this.service.getHousehold(selectedId);
      })
    ).subscribe(h => {
      this.household = h;
    });
  }

}
