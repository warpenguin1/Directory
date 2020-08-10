import { Component, OnInit } from '@angular/core';
import { ObjectID } from 'bson';
import { switchMap } from 'rxjs/operators';

import { Member } from 'src/app/model/Member';
import { MemberService } from 'src/app/services/member.service';
@Component({
  selector: 'app-member-list-display',
  templateUrl: './member-list-display.component.html',
  styleUrls: ['./member-list-display.component.css']
})
export class MemberListDisplayComponent implements OnInit {
  members: Member[];
  constructor(private service: MemberService) { }

  ngOnInit(): void {
    this.service.getMembers().subscribe(m => this.members = m);
  }

}
