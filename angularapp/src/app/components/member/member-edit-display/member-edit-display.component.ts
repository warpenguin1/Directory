import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectID } from 'bson';
import { switchMap } from 'rxjs/operators';

import { MemberService } from 'src/app/services/member.service';
import { MemberDetail } from 'src/app/model/Member';
import { SaveCallback } from 'src/app/model/SaveCallback';

@Component({
  selector: 'app-member-edit-display',
  templateUrl: './member-edit-display.component.html',
  styleUrls: ['./member-edit-display.component.css']
})
export class MemberEditDisplayComponent implements OnInit {
  member: MemberDetail;

  callback: SaveCallback;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: MemberService) {
    this.callback = {
      save: () => {
        this.service.updateMember(this.member)
          .subscribe(_ => this.router.navigateByUrl('member/detail/' + this.member._id));
      },
      name: 'Edit'
    };
  }

  load(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const selectedId = new ObjectID(params.get('id'));
        return this.service.getMember(selectedId);
      })
    ).subscribe(m => {
      this.member = m;
    });
  }

  ngOnInit(): void {
    this.load();
  }

}
