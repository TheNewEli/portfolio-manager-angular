import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

import {AppComponent} from './app.component';
import {InvestmentsComponent} from './investments/investments.component';
import {TimecalPipe} from './investments/timecal.pipe';
import {NetWorthComponent} from './net-worth/net-worth.component';

import {NgxEchartsModule} from 'ngx-echarts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {CashFlowComponent} from './cash-flow/cash-flow.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    BrowserAnimationsModule, MatCardModule, MatRadioModule],
  declarations: [AppComponent, InvestmentsComponent, TimecalPipe, NetWorthComponent, CashFlowComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
