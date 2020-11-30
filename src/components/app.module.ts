import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BatchComponent} from './batch/batch.component';
import {MyLoaderComponent} from './my-loader/my-loader.component';
import { LoaderService } from '../services/loader.service';
import { LoaderInterceptor } from '../services/loader-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    BatchComponent,
    MyLoaderComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    AppRoutingModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
