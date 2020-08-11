import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { Member } from 'src/app/model/Member';
import { SaveCallback } from 'src/app/model/SaveCallback';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @Input() member: Member;
  @Input() callback: SaveCallback;
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

  constructor() { }

  ngOnInit(): void {
  }

}
