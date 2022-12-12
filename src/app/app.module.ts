import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatSlideToggleModule, MatInputModule, MatFormFieldModule } from '@angular/material/';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSlideToggleModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
