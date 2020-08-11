import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { HouseholdAddComponent } from './components/household/household-add/household-add.component';
import { HouseholdDetailComponent } from './components/household/household-detail/household-detail.component';
import { HouseholdDetailDisplayComponent } from './components/household/household-detail-display/household-detail-display.component';
import { HouseholdListComponent } from './components/household/household-list/household-list.component';
import { HouseholdEditComponent } from './components/household/household-edit/household-edit.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { MemberListDisplayComponent } from './components/member/member-list-display/member-list-display.component';
import { MemberDetailComponent } from './components/member/member-detail/member-detail.component';
import { MemberAddComponent } from './components/member/member-add/member-add.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MessageComponent } from './components/util/message/message.component';
import { MenuComponent } from './components/util/menu/menu.component';
import { PhonePipe } from './pipe/phone.pipe';
import { PhoneComponent } from './components/util/phone/phone.component';
import { MemberEditDisplayComponent } from './components/member/member-edit-display/member-edit-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HouseholdAddComponent,
    HouseholdDetailComponent,
    HouseholdListComponent,
    HouseholdEditComponent,
    MemberListComponent,
    MemberDetailComponent,
    MemberAddComponent,
    MemberEditComponent,
    MessageComponent,
    MenuComponent,
    PhonePipe,
    HouseholdDetailDisplayComponent,
    MemberListDisplayComponent,
    PhoneComponent,
    MemberEditDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatChipsModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
