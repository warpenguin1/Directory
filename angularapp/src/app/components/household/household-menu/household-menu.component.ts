import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { HouseholdDetail } from 'src/app/model/Household';
import { HouseholdService } from 'src/app/services/household.service';

@Component({
  selector: 'app-household-menu',
  templateUrl: './household-menu.component.html',
  styleUrls: ['./household-menu.component.css']
})
export class HouseholdMenuComponent implements OnInit {
  @Input() household: HouseholdDetail;
  @Input() edit: boolean;

  constructor(private router: Router,
              public service: HouseholdService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.service.deleteHousehold(this.household).subscribe(_ => {
      this.router.navigateByUrl('/households');
    });
  }
}
