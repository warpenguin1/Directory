import { Component, Input, OnInit } from '@angular/core';

import { HouseholdDetail } from 'src/app/model/Household';
import { MemberDetail } from 'src/app/model/Member';

@Component({
  selector: 'app-household-detail',
  templateUrl: './household-detail.component.html',
  styleUrls: ['./household-detail.component.css']
})
export class HouseholdDetailComponent implements OnInit {
  _MEMBERS: MemberDetail[] = [];
  _HOUSEHOLD: HouseholdDetail;
  @Input()
  get household(): HouseholdDetail { return this._HOUSEHOLD; }
  set household(h: HouseholdDetail) {
    this._HOUSEHOLD = h;
    this._MEMBERS = [];
    if (this._HOUSEHOLD.Members !== undefined && this._HOUSEHOLD.Members.length > 0){
      for (const member of this._HOUSEHOLD.Members){
        const memberDetail: any = member;
        memberDetail.Household = this._HOUSEHOLD;
        this._MEMBERS.push(memberDetail);
      }
    }
  }
  @Input() addMember: boolean;

  hobbieMapping: {[k: string]: string} = {'=0': 'No hobbies', '=1': 'hobbie', other: 'Hobbies'};
  foodMapping: {[k: string]: string} = {'=0': 'No favorite food', '=1': 'Favorite food', other: 'Favorite foods'};

  constructor() { }

  ngOnInit(): void {
  }
}