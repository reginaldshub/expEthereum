import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule,Routes } from "@angular/router";
import { FlashMessagesModule } from './flash/module';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { NgxPaginationModule} from "ngx-pagination";

import { FilterPipeModule } from 'ngx-filter-pipe';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from "./services/validate.service";
import { BalanceComponent } from './components/balance/balance.component';
import { TestnetworkComponent } from './components/testnetwork/testnetwork.component';
import { LocalnetworkComponent } from './components/localnetwork/localnetwork.component';
import { LocaltransactionsComponent } from './components/localtransactions/localtransactions.component';
import { LocallistaccountComponent } from './components/locallistaccount/locallistaccount.component';
import { LocalcreateaccountComponent } from './components/localcreateaccount/localcreateaccount.component';
import { LocalbalanceComponent } from './components/localbalance/localbalance.component';
import { LocalsendtransactionComponent } from './components/localsendtransaction/localsendtransaction.component';
import { LocalpendingtransactionComponent } from './components/localpendingtransaction/localpendingtransaction.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]
   ,children: [
    { path: '', component: LocalnetworkComponent, canActivate:[AuthGuard]
    ,children: [
      {path: '', component: LocaltransactionsComponent},
     {path: 'localtranslist', component: LocaltransactionsComponent},
     {path: 'locallistaccount', component: LocallistaccountComponent},
     {path: 'localcreateaccount', component: LocalcreateaccountComponent},
     {path: 'localbalance', component: LocalbalanceComponent},
     {path: 'localsendtrans', component: LocalsendtransactionComponent},
     {path: 'localpendingtrans', component: LocalpendingtransactionComponent},
   ]},
    {path: 'balance', component: BalanceComponent},
     { path: 'test', component: TestnetworkComponent},
     { path: 'local', component: LocalnetworkComponent , canActivate:[AuthGuard]
   ,children: [
    {path: '', component: LocaltransactionsComponent},
    {path: 'localtranslist', component: LocaltransactionsComponent},
    {path: 'locallistaccount', component: LocallistaccountComponent},
    {path: 'localcreateaccount', component: LocalcreateaccountComponent},
    {path: 'localbalance', component: LocalbalanceComponent},
    {path: 'localsendtrans', component: LocalsendtransactionComponent},
    {path: 'localpendingtrans', component: LocalpendingtransactionComponent},
  ]}
   ]
},
  { path: 'profile', component: ProfileComponent,  canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    BalanceComponent,
    TestnetworkComponent,
    LocalnetworkComponent,
    LocaltransactionsComponent,
    LocallistaccountComponent,
    LocalcreateaccountComponent,
    LocalbalanceComponent,
    LocalsendtransactionComponent,
    LocalpendingtransactionComponent
  ],
  imports: [
    FilterPipeModule,
    NgxPaginationModule,
  BrowserAnimationsModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
