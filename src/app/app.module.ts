import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { AccountNewComponent } from './account-new/account-new.component';
import { AccountEditPwComponent } from './account-edit-pw/account-edit-pw.component';
import { AccountTransactionHistoryComponent } from './account-transaction-history/account-transaction-history.component';
import { IsaComponent } from './isa/isa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AccountComponent,
    AccountNewComponent,
    AccountEditPwComponent,
    AccountTransactionHistoryComponent,
    IsaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
