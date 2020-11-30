// Import des composants angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Import des composants développés
import { AppComponent } from './app.component';
import { BatchComponent } from './batch/batch.component';


// Variable indiquant les chemins d'accès aux différents composants de l'application 
const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: AppComponent },
  { path: 'batch', component: BatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
