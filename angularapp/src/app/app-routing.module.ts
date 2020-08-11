import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseholdListComponent } from './components/household/household-list/household-list.component';
import { HouseholdDetailDisplayComponent } from './components/household/household-detail-display/household-detail-display.component';
import { HouseholdEditComponent } from './components/household/household-edit/household-edit.component';
import { HouseholdAddComponent } from './components/household/household-add/household-add.component';
import { MemberListDisplayComponent } from './components/member/member-list-display/member-list-display.component';
import { MemberDetailComponent } from './components/member/member-detail/member-detail.component';
import { MemberEditDisplayComponent } from './components/member/member-edit-display/member-edit-display.component';
import { MemberAddComponent } from './components/member/member-add/member-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'household/add', pathMatch: 'full' },
  { path: 'households', component: HouseholdListComponent },
  { path: 'household/detail/:id', component: HouseholdDetailDisplayComponent },
  { path: 'household/edit/:id', component: HouseholdEditComponent },
  { path: 'household/add', component: HouseholdAddComponent },
  { path: 'members', component: MemberListDisplayComponent },
  { path: 'member/detail/:id', component: MemberDetailComponent },
  { path: 'member/edit/:id', component: MemberEditDisplayComponent },
  { path: 'member/add/:id', component: MemberAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
