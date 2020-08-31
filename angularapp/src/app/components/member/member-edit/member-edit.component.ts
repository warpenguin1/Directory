import { Component, OnInit, Input } from '@angular/core';
import { FormArray, Validators, FormControl, FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { Member } from 'src/app/model/Member';
import { SaveCallback } from 'src/app/model/SaveCallback';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  _MEMBER: Member;
  memberFG = this.formBuilder.group({
    FirstName: ['', Validators.required],
    Email: ['', Validators.email],
    Ocupation: [''],
    Birthplace: [''],
    Birthdate: [''],
    BaptismDate: [''],
    FavScripture: [''],
    FavHymn: [''],
  });

  @Input()
  get member(): Member {
    return this.getMember();
  }
  set member(m: Member) {
    this.setMember(m);
  }
  @Input() callback: SaveCallback;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  get favFood(): FormArray {
    return this.memberFG.get('FavFood') as FormArray;
  }

  getMember(): Member {
    const values = this.memberFG.value;
    const member = this._MEMBER;
    member.FirstName = values.FirstName;
    member.Email = values.Email;
    member.Ocupation = values.Ocupation;
    member.Birthplace = values.Birthplace;
    member.Birthdate = values.Birthdate;
    member.BaptismDate = values.BaptismDate;
    member.FavScripture = values.FavScripture;
    member.FavHymn = values.FavHymn;
    return member;
  }

  // updates FormGroup with new data
  setMember(m: Member): void {
    this._MEMBER = m;
    this.memberFG.patchValue({
      FirstName: m.FirstName,
      Email: m.Email,
      Ocupation: m.Ocupation,
      Birthplace: m.Birthplace,
      Birthdate: m.Birthdate,
      BaptismDate: m.BaptismDate,
      FavScripture: m.FavScripture,
      FavHymn: m.FavHymn
    });
  }

  addHobby(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this._MEMBER.Hobbies.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeHobby(hobby: string): void {
    const index = this._MEMBER.Hobbies.indexOf(hobby);
    if (index >= 0) {
      this._MEMBER.Hobbies.splice(index, 1);
    }
  }

  addFood(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this._MEMBER.FavFood.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeFood(food: string): void {
    const index = this._MEMBER.FavFood.indexOf(food);
    if (index >= 0) {
      this._MEMBER.FavFood.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.memberFG.valid) {
      this.callback.save();
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
}
