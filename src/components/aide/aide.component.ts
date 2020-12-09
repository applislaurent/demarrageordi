import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NgModule} from '@angular/core';
import 'web-component-essentials';
import {AidecontenuComponent} from '../aidecontenu/aidecontenu.component'
//import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, CUSTOM_ELEMENTS_SCHEMA } from '@angular/material/dialog';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.css']
})
export class AideComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AidecontenuComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
