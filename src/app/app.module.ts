import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { InvestmentsComponent } from './investments/investments.component';
import {TimecalPipe} from './investments/timecal.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, CommonModule ],
  declarations: [ AppComponent, InvestmentsComponent, TimecalPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
