import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectID } from 'bson';
import { switchMap } from 'rxjs/operators';

import { MemberService } from 'src/app/services/member.service';
import { HouseholdService } from 'src/app/services/household.service';
import { Member } from 'src/app/model/Member';
import { HouseholdDetail } from 'src/app/model/Household';
import { SaveCallback } from 'src/app/model/SaveCallback';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {
  member: Member;
  household: HouseholdDetail = null;

  callback: SaveCallback = {
    save: null,
    name: 'Add'
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: MemberService,
              private householdService: HouseholdService) {
    this.callback.save = () => {
      this.service.addMember(this.member)
        .subscribe(_ => this.router.navigateByUrl('household/detail/' + this.household._id));
    };
  }

  load(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const selectedId = new ObjectID(params.get('id'));
        this.reset(selectedId);
        return this.householdService.getHousehold(selectedId);
      })
    ).subscribe(h => {
      this.household = h;
    });
  }

  reset(householdId): void {
    this.member = {
      _id: null,
      HouseholdId: householdId,
      FirstName: '',
      Phone: [],
      Email: '',
      Ocupation: '',
      Birthplace: '',
      Birthdate: null,
      BaptismDate: null,
      Hobbies: [],
      FavFood: [],
      FavScripture: '',
      FavHymn: ''
    };
  }
  ngOnInit(): void {
    this.load();
  }


}
