import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectID } from 'bson';
import { switchMap } from 'rxjs/operators';

import { MemberService } from 'src/app/services/member.service';
import { HouseholdService } from 'src/app/services/household.service';
import { Member } from 'src/app/model/Member';
import { HouseholdDetail } from 'src/app/model/Household';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {
  member: Member;
  household: HouseholdDetail = null;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  addHobby(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.member.Hobbies.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeHobby(hobby: string): void {
    const index = this.member.Hobbies.indexOf(hobby);
    if (index >= 0) {
      this.member.Hobbies.splice(index, 1);
    }
  }

  addFood(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.member.FavFood.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeFood(food: string): void {
    const index = this.member.FavFood.indexOf(food);
    if (index >= 0) {
      this.member.FavFood.splice(index, 1);
    }
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: MemberService,
              private householdService: HouseholdService) { }

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

  save(): void {
    this.service.addMember(this.member)
      .subscribe(_ => this.router.navigateByUrl('household/detail/' + this.household._id));
  }
}
