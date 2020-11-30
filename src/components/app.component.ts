import { Component, OnInit } from '@angular/core';

// Import des composants développés
import { BatchComponent } from './batch/batch.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
