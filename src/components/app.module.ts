import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BatchComponent} from './batch/batch.component';
import {MyLoaderComponent} from './my-loader/my-loader.component';
import {LoaderService} from '../services/loader.service';
import {LoaderInterceptor} from '../services/loader-interceptor.service';

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
    MatInputModule,
	MatIconModule,
    AppRoutingModule,
  ],
  
   exports: [
    MatButtonModule,
	MatIconModule
  ],

  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
