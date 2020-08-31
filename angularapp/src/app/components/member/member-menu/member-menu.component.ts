import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MemberDetail } from 'src/app/model/Member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-menu',
  templateUrl: './member-menu.component.html',
  styleUrls: ['./member-menu.component.css']
})
export class MemberMenuComponent implements OnInit {
  @Input() member: MemberDetail;
  @Input() edit: boolean;

  constructor(private router: Router,
              public service: MemberService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.service.deleteMember(this.member).subscribe(_ => {
      this.router.navigateByUrl(`/household/detail/${this.member.HouseholdId}`);
    });
  }
}
