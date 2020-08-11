import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectID } from 'bson';
import { switchMap } from 'rxjs/operators';

import { MemberDetail } from 'src/app/model/Member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: MemberDetail = null;
  phoneMapping: {[k: string]: string} = {'=0': 'No Phone Numbers:', '=1': 'Phone Number:', other: 'Phone Numbers'};
  hobbieMapping: {[k: string]: string} = {'=0': 'No hobbies', '=1': 'hobbie', other: 'Hobbies'};
  foodMapping: {[k: string]: string} = {'=0': 'No favorite food', '=1': 'Favorite food', other: 'Favorite foods'};

  constructor(private route: ActivatedRoute, private service: MemberService) { }

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

  delete(): void {
    if (confirm(`Are you sure you want to delete ${this.member.FirstName}`)) {
      this.service.deleteMember(this.member);
    }
  }

  ngOnInit(): void {
    this.load();
  }

}
