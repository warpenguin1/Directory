import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { MemberDetail } from '../../../model/Member';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  private _MEMBERS: MemberDetail[];
  displayedColumns: string[] = ['FirstName', 'Phone', 'Email', 'Birthdate'];
  @ViewChild(MatTable) table: MatTable<MemberDetail>;

  @Input()
  get members(): MemberDetail[] { return this._MEMBERS; }
  set members(m: MemberDetail[]) {
    this._MEMBERS = m;
    if (this._MEMBERS !== undefined &&
        this._MEMBERS.length > 0 &&
        this.table !== undefined) {
      this.table.renderRows();
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
