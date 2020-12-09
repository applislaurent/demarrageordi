import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
//import {NgModule} from '@angular/core';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {NgImageSliderModule} from 'ng-image-slider';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BatchComponent} from './batch/batch.component';
import {MyLoaderComponent} from './my-loader/my-loader.component';
import { LoaderService } from '../services/loader.service';
import { LoaderInterceptor } from '../services/loader-interceptor.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AideComponent } from './aide/aide.component';
import { AidecontenuComponent } from './aidecontenu/aidecontenu.component';
import { CarouselComponent } from './carousel/carousel.component';



@NgModule({
  declarations: [
    AppComponent,
    BatchComponent,
    MyLoaderComponent,
	AidecontenuComponent,
    AideComponent,
    CarouselComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
	MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
	MatDialogModule,
    AppRoutingModule,
	NgImageSliderModule,
	Ng2SearchPipeModule
  ],
  
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
