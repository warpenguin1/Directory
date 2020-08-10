import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { HouseholdService } from '../../../services/household.service';
import { HouseholdDetail } from '../../../model/Household';

@Component({
  selector: 'app-household-list',
  templateUrl: './household-list.component.html',
  styleUrls: ['./household-list.component.css']
})
export class HouseholdListComponent implements OnInit {
  households: HouseholdDetail[] = null;
  displayedColumns: string[] = ['LastName', 'Members', 'Address1', 'Address2', 'City', 'State', 'Zip'];
  @ViewChild(MatTable) table: MatTable<HouseholdDetail>;

  constructor(private service: HouseholdService) { }

  private load(): void {
    this.service.getHouseholds().subscribe(h => {
      this.households = h;
      if (this.households !== undefined && this.households.length > 0) {
        this.table.renderRows();
      }
    });
  }

  ngOnInit(): void {
    this.load();
  }
}
