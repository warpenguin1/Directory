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

import { HouseholdAddComponent } from './components/houshold/household-add/household-add.component';
import { HouseholdDetailComponent } from './components/houshold/household-detail/household-detail.component';
import { HouseholdListComponent } from './components/houshold/household-list/household-list.component';
import { HouseholdEditComponent } from './components/houshold/household-edit/household-edit.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { MemberDetailComponent } from './components/member/member-detail/member-detail.component';
import { MemberAddComponent } from './components/member/member-add/member-add.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MessageComponent } from './components/util/message/message.component';
import { MenuComponent } from './components/util/menu/menu.component';

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
    MenuComponent
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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
